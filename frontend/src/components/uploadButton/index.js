import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./index.css";

function UploadButton({
  text,
  component,
  onChange,
  isIconBtn,
  icon,
  className,
  hideFileName,
  name,
  uploadedFileName,
}) {
  const [fileName, setFileName] = useState(
    uploadedFileName ? uploadedFileName : null
  );

  const onFileUpload = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0]?.name);
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="upload-btn-container">
      {isIconBtn ? (
        <IconButton
          aria-label="upload picture"
          component="label"
          className={`btn-styles ${className}`}
        >
          <input
            name={name}
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => onFileUpload(e)}
          />
          {icon ? icon : <FileUploadOutlinedIcon />}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          component="label"
          className={`btn-styles ${className}`}
        >
          {text ? text : "Upload"}
          {component}
          <input
            name={name}
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => onFileUpload(e)}
          />
        </Button>
      )}
      {!hideFileName && fileName && (
        <>
          <span className="filename-uploaded">{fileName}</span>
        </>
      )}
    </div>
  );
}

export default UploadButton;
