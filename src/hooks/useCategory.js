import { useLocation } from "react-router-dom";

const paths = {
  "/ndfl": "finance",
  "/loan": "finance",
  "/nds": "finance",
  "/mortgage": "finance",
  "/ideal-weight": "health",
  "/body-type": "health",
  "/imt": "health",
  "/base64": "tech",
  "/currency": "currency",
  "/password-generator": "tech",
  "/convert-css": "tech",
};

export const useCategory = () => {
  const location = useLocation();
  return paths[location.pathname];
};
