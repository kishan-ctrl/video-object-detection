import React,{ useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Resultpage.css";


const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const passed = results.some((res) => res.score > 0.5);
  const [confetti, setConfetti] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      const confettiArray = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      }));
      setConfetti(confettiArray);
      
      // Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [passed]);


  return (
    <div className="Res-body">
      {/* Confetti */}
      {showConfetti && confetti.map(item => (
        <div 
          key={item.id}
          className="Res-confetti"
          style={{
            left: `${item.left}%`,
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            top: '-10px'
          }}
        />
      ))}
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