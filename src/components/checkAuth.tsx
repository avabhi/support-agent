import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({
  children,
  protectedRoute,
}: {
  children: React.ReactNode;
  protectedRoute: boolean;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (protectedRoute) {
      if (!token) {
        // If the route is protected and no token is found, redirect to login
        navigate("/login");
      } else {
        // If the route is protected and token is found, allow access
        setLoading(false);
      }
    } else {
      if (token) {
        navigate("/");
      } else {
        // If the route is not protected and token is found, redirect to home
        setLoading(false);
      }
    }
  }, [navigate, protectedRoute]);
  return <>{loading ? <p>Loading..</p> : <>{children}</>}</>;
};

export default CheckAuth;
