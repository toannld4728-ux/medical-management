import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-sky-50">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
