import { useNavigate } from "react-router-dom";

const Protected = ({ auth, children }) => {
  const navigate = useNavigate();
  if (!auth) {
    return navigate("/login");
  } else {
    return children;
  }
};

export default Protected;
