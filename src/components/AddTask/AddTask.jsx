import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/actions/taskActions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./AddTask.css";

const AddTask = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    setUploading(true);

    let fileUrl = null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        setUploading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mitm87x0");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcnblai32/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fileUrl = response.data.secure_url;
      } catch (error) {
        console.error("File upload failed:", error.response || error.message);
        alert(
          `File upload failed. ${
            error.response?.data?.error?.message || error.message
          }`
        );
        setUploading(false);
        return;
      }
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      category,
      dueDate,
      status,
      attachment: fileUrl,
    };

    try {
      dispatch(addTask(newTask));
      alert("Task added successfully!");
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Task creation failed:", error.message);
      alert("Failed to add task. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Work");
    setDueDate("");
    setStatus("");
    setFile(null);
  };

  return (
    <div className="add-task">
      <div className="modal-header">
        <h2>Create Task</h2>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
      </div>
      <div className="form-inputs" style={{ padding: "15px" }}>
        <div className="form-groupa">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
        </div>
        <div className="form-groupb">
          <div className="btn-group">
            <button
              className={category === "Work" ? "btn active" : "btn"}
              onClick={() => setCategory("Work")}
            >
              Work
            </button>
            <button
              className={category === "Personal" ? "btn active" : "btn"}
              onClick={() => setCategory("Personal")}
            >
              Personal
            </button>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input date-input"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="">Choose</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-group attachment-group">
          <label>Attachment</label>
          <div className="attachment-input">
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
            />
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button onClick={closeModal} className="form-btn cancel-btn">
          Cancel
        </button>
        <button
          onClick={handleAddTask}
          className="form-btn create-btn"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
