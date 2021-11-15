import React, { useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      setLoading(false);
    });

    return () => unsubscribe;
  }, []);

  const value = {
    currUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
