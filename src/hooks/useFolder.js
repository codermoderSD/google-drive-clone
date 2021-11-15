import { useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "select_folder",
  UPDATE_FOLDER: "update_folder",
  SET_CHILD_FOLDER: "set_child_folder",
  SET_CHILD_FILES: "set_child_files",
};

export const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folder: payload.folder,
        folderId: payload.folderId,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDER:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFiles: [],
    childFolders: [],
  });

  const { currUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDER,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currUser]);

  useEffect(() => {
    return database.files
      .where("folderId", "==", folderId)
      .where("userId", "==", currUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currUser]);

  return state;
}
