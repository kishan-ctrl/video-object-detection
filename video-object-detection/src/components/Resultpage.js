import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Resultpage.css";


const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const passed = results.some((res) => res.score > 0.5);

  return (
    <div className="Res-body">
      <h1 className="Res-title">Candidate Results</h1>
      
      <div className="Res-card">
        <h2 className="Res-title" style={{ fontSize: "1.8rem" }}>Detected Objects</h2>
        
        <div className={`Res-status ${passed ? "Res-status-pass" : "Res-status-fail"}`}>
          {passed ? (
            "✅ Candidate Passed the Trial Session"
          ) : (
            "❌ Candidate Failed the Trial Session"
          )}
        </div>
        
        <ul className="Res-list">
          {results.map((res, index) => (
            <li className="Res-item" key={index}>
              <span className="Res-item-name">{res.className}</span>
              <span className="Res-item-score">Confidence: {(res.score * 100).toFixed(2)}%</span>
            </li>
          ))}
        </ul>
        
        <button className="Res-button" onClick={() => navigate("/")}>
          Back to Upload
        </button>
      </div>
    </div>
  );
};

export default ResultPage;