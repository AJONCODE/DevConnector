import React from "react";

const AppFooter = () => {
  return (
    <div>
      <footer className="bg-dark text-white text-center mt-5 p-4">
        Copyright &copy; {new Date().getFullYear()} Dev Connecter
      </footer>
    </div>
  );
};

export default AppFooter;
