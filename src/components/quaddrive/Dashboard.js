import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import DriveNavbar from "./DriveNavbar";
import Folder from "./Folder";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state && state.folder
  );

  return (
    <>
      <DriveNavbar />
      <Container fluid>
        <div className="d-flex align-items-center mt-2">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((folder) => {
              return (
                <div
                  key={folder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={folder} />
                </div>
              );
            })}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((file) => {
              return (
                <div
                  key={file.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <File file={file} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
