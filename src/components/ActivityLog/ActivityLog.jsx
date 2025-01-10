import React from "react";
import "./ActivityLog.css";

const ActivityLog = ({ logs }) => {
  return (
    <div className="activity-log">
      <h2>Activity Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
