import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";

interface AuthenticateContextType {
    token: string | null;
    setToken: (value: string|null) => void;
}

const AuthenticateContext = createContext<AuthenticateContextType | undefined>(undefined);

interface AuthenticateProviderProps {
    children: ReactNode;
}

export const AuthenticateProvider: React.FC<AuthenticateProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <AuthenticateContext.Provider value={{ token, setToken }}>
            {children}
        </AuthenticateContext.Provider>
    );
};

export const useAuthenticate = () => {
    const context = useContext(AuthenticateContext);
    if (context === undefined) {
        throw new Error("useAuthenticate must be used within an AuthenticateProvider");
    }
    return context;
};
