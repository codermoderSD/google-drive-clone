import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const FolderBreadcrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      listProps={{ className: "bg-white ps-0 m-0" }}
      className="flex-grow-1"
    >
      {path.map((folder, index) => {
        return (
          <Breadcrumb.Item
            key={folder.id}
            linkAs={Link}
            linkProps={{
              to: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px" }}
          >
            {folder.name}
          </Breadcrumb.Item>
        );
      })}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default FolderBreadcrumbs;
