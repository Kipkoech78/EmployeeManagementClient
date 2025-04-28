import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import CheckAuth from "./components/common/checkAuth";
import ManagementLayout from "./components/management-view/layout";
import ManagementTable from "./pages/management-view/listing";
import ManagementHome from "./pages/management-view/home";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import { Skeleton } from "./components/ui/skeleton";
import AdminHome from "./pages/admin/AdminHome";
import AdminLayout from "./components/admin/layout";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("user info", user);
  console.log("Authentication", isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  console.log("Check if loading", isLoading);
  if (isLoading) return <Skeleton className="w-[100%] h-[100%] bg-black " />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/management"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ManagementLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ManagementHome />} />
          <Route path="listing" element={<ManagementTable />} />
         
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminHome />} />
          
        </Route>

      </Routes>
    </div>
  );
}

export default App;
