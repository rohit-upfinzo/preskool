import { LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data, loading } = useSelector((store) => store.user);

  if (loading)
    return (
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "#1E3A8A", type: "bars" }}
      />
    );

  return data ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
