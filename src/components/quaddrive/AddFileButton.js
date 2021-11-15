import React, { useState } from "react";
import ReactDOM from "react-dom";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext";
import { database, storage } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import { Toast, ProgressBar } from "react-bootstrap";

const AddFileButton = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currUser } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;

        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((file) => {
            if (file.id === id) {
              return { ...file, progress: progress };
            }

            return file;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((file) => {
            if (file.id === id) {
              return { ...file, error: true };
            }
            return file;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((file) => {
            return file.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currUser.uid,
                });
              }
            });
        });
      }
    );
  };

  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 me-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter((uploadFile) => {
                        return uploadFile.id !== file.id;
                      });
                    });
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      animated={!file.error}
                      variant={file.error ? "danger" : "primary"}
                      now={file.error ? 100 : file.progress * 100}
                      label={
                        file.error
                          ? "Error"
                          : `${Math.round(file.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
