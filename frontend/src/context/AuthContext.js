import { createContext, useState } from "react";
import { io } from "socket.io-client";

const AuthContext = createContext({});
const FollowingContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [logged, setLogged] = useState(false);
  const [socket, setSocket] = useState(""); // connect to the server

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logged, setLogged, socket, setSocket }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
