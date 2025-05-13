import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
   const passed = results.some((res) => res.score > 0.5);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detected Objects</h2>
      <h2>Candidate Result</h2>
      <div style={{ margin: "20px 0", fontSize: "20px" }}>
        {passed ? (
          <span style={{ color: "green" }}>
            ✅ Candidate Pass the Trial Session
          </span>
        ) : (
          <span style={{ color: "red" }}>
            ❌ Candidate Fail the Trial Session
          </span>
        )}
      </div>
      <ul>
        {results.map((res, index) => (
          <li key={index}>
            <strong>{res.className}</strong> - Confidence: {(res.score * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back to Upload</button>
    </div>
  );
};

export default ResultPage;
