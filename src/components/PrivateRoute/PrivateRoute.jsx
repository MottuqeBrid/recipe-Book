import { useLocation, useNavigate } from "react-router";
import useAuth from "../../providers/useAuth";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { state: location.pathname });
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
