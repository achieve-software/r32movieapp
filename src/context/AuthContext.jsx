import React from "react";
import { createContext } from "react/cjs/react.production.min";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const values={}
  return;
  <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
