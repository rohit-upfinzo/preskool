import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useEffect } from "react";
import { verifyUser } from "./services/authService";
import PublicOnlyRoute from "./protected-routes/PublicOnlyRoute";
import ProtectedRoute from "./protected-routes/ProtectedRoute";
import { useDispatch } from "react-redux";
import { addError, addLoading, addUser } from "./redux/slices/userSlice";
import ForgetPassword from "./pages/auth/ForgetPassword";

const App = () => {
  const dispatch = useDispatch();

  const handleVerifyUser = async () => {
    dispatch(addLoading());
    const res = await verifyUser();

    if (!res.ok) {
      dispatch(addError(res?.message));
      dispatch(addUser(null));
      return;
    }
    dispatch(addUser(res?.data?.user));
  };

  useEffect(() => {
    handleVerifyUser();
  }, []);

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        {/* add more private pages here */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
