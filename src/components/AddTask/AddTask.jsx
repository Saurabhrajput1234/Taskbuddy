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

        // Upload file to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dcnblai32/image/upload`,
          formData
        );

        fileUrl = response.data.secure_url;
      } catch (error) {
        console.error("File upload failed:", error);
        alert("File upload failed. Please try again.");
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

    dispatch(addTask(newTask));
    setUploading(false);
    closeModal();
    resetForm();
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
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Enter Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="add-task-input"
      />
      <textarea
        placeholder="Enter Task Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="add-task-textarea"
      />
      <div className="task-meta">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Choose Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="attachment">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
      </div>
      <button
        onClick={handleAddTask}
        className="add-task-button"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Task"}
      </button>
      <button onClick={closeModal} className="cancel-task-button">
        Cancel
      </button>
    </div>
  );
};

export default AddTask;
