import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://example.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("File uploaded successfully.");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        alert("An error occurred while uploading the file.");
      });
  };

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <iframe
        title="Dashbord_Marketing"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/reportEmbed?reportId=2a8724f0-921b-4887-8f65-0a4f7f566029&autoAuth=true&ctid=35c1785d-3361-4341-a29e-fc685e52b8a5"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default AdminPage;
