import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); 
    const name = params.get("name");  
    const email = params.get("email");

    console.log("Token:", token);
    console.log("Name:", name);
    console.log("Email:", email);

    if (token && name && email) {
      
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      
      navigate("/Dashboard/dashboard");
    } else {
      console.error("Login failed: Missing token, name, or email.");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;





