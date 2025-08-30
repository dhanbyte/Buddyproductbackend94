import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
};

export default Signup;
