import React, { useState } from "react";
import "./TaskViewModal.css";

const TaskViewModal = ({ task, isOpen, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const [attachment, setAttachment] = useState(task.attachment);

  const activityLog = [
    { message: "You created this task", date: new Date(task.createdAt) },
    {
      message: "You changed status from in-progress to complete",
      date: new Date(task.updatedAt),
    },
    {
      message: "You uploaded a file",
      date: new Date(task.attachmentUpdatedAt),
    },
  ];

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      category,
      dueDate,
      status,
      attachment,
    };
    onUpdate(updatedTask);
    onClose();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header"></div>

        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        {/* Left Section */}
        <div className="sub-model-container">
          <div className="modal-left">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="task-title-input"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="task-description"
            />
            <div className="task-category">
              <button
                className={`category-btn ${
                  category === "Work" ? "active-category" : ""
                }`}
                onClick={() => setCategory("Work")}
              >
                Work
              </button>
              <button
                className={`category-btn ${
                  category === "Personal" ? "active-category" : ""
                }`}
                onClick={() => setCategory("Personal")}
              >
                Personal
              </button>
            </div>
            <div className="task-details">
              <div className="task-date">
                <label>Due on*</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="task-status">
                <label>Task Status*</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="TO-DO">TO-DO</option>
                  <option value="IN-PROGRESS">IN-PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
            <div className="task-attachment">
              <label>Attachment</label>
              <input
                type="file"
                id="attachment"
                onChange={(e) =>
                  setAttachment(URL.createObjectURL(e.target.files[0]))
                }
              />
              {attachment && (
                <div className="attachment-preview-container">
                  <img
                    src={attachment}
                    alt="Attachment Preview"
                    className="attachment-preview"
                  />
                  <button
                    className="remove-attachment"
                    onClick={() => setAttachment(null)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="modal-right">
            <div className="activity-head">
              <h4>Activity</h4>
            </div>
            <div className="content" style={{ padding: "12px" }}>
              {activityLog.map((log, index) => (
                <div key={index} className="activity-log">
                  <p>{log.message}</p>
                  <span>{formatDate(log.date)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleUpdate} className="update-button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;
