import React, { useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadVideo.css";

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoFile, setVideoFile] = useState(null); // ✅ store the actual file
  const [model, setModel] = useState(null);
  const [objectsDetected, setObjectsDetected] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidateId, setCandidateId] = useState("");

  const videoRef = useRef();
  const canvasRef = useRef();
  const navigate = useNavigate();

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(URL.createObjectURL(file));
    setVideoFile(file); // ✅ store file
  };

  const loadModel = async () => {
    const loadedModel = await cocoSsd.load();
    setModel(loadedModel);
  };

  const startDetection = async () => {
    if (!videoRef.current || !model) return;
    videoRef.current.play();
    detectFrame(videoRef.current, model);
  };

  const detectFrame = (video, model) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const detect = async () => {
      if (video.paused || video.ended) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const predictions = await model.detect(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      predictions.forEach((pred) => {
        ctx.beginPath();
        ctx.rect(...pred.bbox);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.stroke();
        ctx.fillText(
          pred.class,
          pred.bbox[0],
          pred.bbox[1] > 10 ? pred.bbox[1] - 5 : 10
        );
      });

      setObjectsDetected(predictions);
      requestAnimationFrame(() => detect());
    };

    detect();
  };

  const handleEnd = async () => {
    videoRef.current.pause();

    if (!videoFile) {
      alert("Please upload a video file before submitting.");
      return;
    }

    const responseData = objectsDetected.map((item) => ({
      className: item.class,
      score: item.score,
    }));

    const formData = new FormData();
    formData.append("candidateId", candidateId);
    formData.append("candidateName", candidateName);
    formData.append("video", videoFile);

    try {
      await axios.post("http://localhost:8080/api/results/upload", formData);
      navigate("/results", { state: { results: responseData } });
      alert("Succefully Detected")
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
  <div className="video-upload-page">  
  <h2 className="upvideo-title">Object Detection Panel</h2>

  <div className="upvideo-body">
    
    <input
      type="text"
      placeholder="Candidate Name"
      value={candidateName}
      onChange={(e) => setCandidateName(e.target.value)}
      className="upvideo-input"
    />
    <br />
    <input
      type="text"
      placeholder="Candidate ID"
      value={candidateId}
      onChange={(e) => setCandidateId(e.target.value)}
      className="upvideo-input"
    />
    <br />
    <input
      type="file"
      accept="video/*"
      onChange={handleVideoUpload}
      className="upvideo-input"
    />
    <br />

    {video && (
      <div className="upvideo-video-container">
        <video
          ref={videoRef}
          src={video}
          width="640"
          height="480"
          style={{ display: "block" }}
          onLoadedData={loadModel}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="25"
          className="upvideo-canvas"
        />
      </div>
    )}

    {video && (
      <div className="upvideo-controls">
        <button className="upvideo-button" onClick={startDetection}>
          START
        </button>
        <button className="upvideo-button" onClick={handleEnd}>
          END
        </button>
      </div>
    )}
  </div>
  </div>
);

};

export default UploadVideo;
