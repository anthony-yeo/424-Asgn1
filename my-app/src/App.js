import { NavLink, Routes, Route } from "react-router-dom";
import React from "react";

import { Home } from "./Home";
import { Landing } from "./Landing";
import { NewAccount } from "./NewAccount";

import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthProvider";



export const AuthContext = React.createContext(null);  // we will use this in other components

const App = () => {
  
  return (

    <AuthProvider>
        <Navigation />
    
        <h1>React Router</h1>

        <Routes>
            <Route index element={<Home />} />
            <Route path="landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
            <Route path="home" element={<Home />} />
            <Route path="newaccount" element={<NewAccount />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </AuthProvider>
    );
};

const Navigation = () => {
    const { value } = useAuth();
    return (
      <nav>

        <NavLink to="/home">Home</NavLink>
        <NavLink to="/landing">Landing</NavLink>

        {value.token && (
          <button type="button" onClick={value.onLogout}>
            Sign Out
          </button>
        )}

    </nav>

)};

export default App;