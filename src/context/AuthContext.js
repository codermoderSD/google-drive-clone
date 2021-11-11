import React, { useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currUser, setCurrUser] = useState();

  //   const signup = (email, password) => {
  //     auth.createUserWithEmailAndPassword(email, password);
  //   };

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChange((user) => {
  //       setCurrUser(user);
  //     });

  //     return () => unsubscribe;
  //   }, []);

  const value = {
    currUser,
    // signup,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
