import { createContext, useContext, useState, useEffect } from "react";
// import { fakeAuth } from "../utils/FakeAuth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('TOKEN_KEY') || null);


    useEffect(() => {
        // Retrieve the token from the URL query parameters
        const queryParameters = new URLSearchParams(window.location.search);
        const google_token = queryParameters.get("token");

        console.log(google_token);

        if (google_token) {
            setToken(google_token);
            localStorage.setItem('TOKEN_KEY', google_token);
            navigate("/landing");
        }
    }, [navigate]);

    const handleLogin = async () => {
        setToken(true);
        navigate("/landing");
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('TOKEN_KEY');
        navigate('/home');
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={{ value }}>
        {children}
        </AuthContext.Provider>
    );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);