import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Login;
