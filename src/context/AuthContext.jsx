import React from "react";
import { createContext } from "react/cjs/react.production.min";


export const AuthContext =createContext()




const AuthContextProvider = () => {
  return
   <AuthContext.Provider>
    {AuthContext}
    </AuthContext.Provider>;
};

export default AuthContextProvider;
