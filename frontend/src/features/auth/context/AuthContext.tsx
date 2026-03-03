import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCheckingUsers , setIsCheckingUsers] = useState(false)

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading ,allUser, setAllUser,isCheckingUsers , setIsCheckingUsers}}>
      {children}
    </AuthContext.Provider>
  );
};