import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
    const { auth } = useContext(AuthContext);
  return auth.id;
};
