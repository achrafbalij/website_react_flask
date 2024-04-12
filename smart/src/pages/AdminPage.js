import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="flex w-full h-full p-8 items-center justify-center">
      <iframe title="smart_1_2_3_4_new_data11" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=71d0ce95-599b-4fa0-ad98-ead5ed7d6d75&autoAuth=true&ctid=35c1785d-3361-4341-a29e-fc685e52b8a5" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    
  );
};

export default AdminPage;
