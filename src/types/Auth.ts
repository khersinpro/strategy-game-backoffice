export interface IAuthContext {
    user: any;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}
  
export interface AuthProviderProps {
    children: React.ReactNode;
}

export interface Credentials {
    email: string;
    password: string;
}
  
export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}