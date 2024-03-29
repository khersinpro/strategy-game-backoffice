export interface IAuthContext {
    user: any;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}
  
export interface AuthProviderProps {
    children: React.ReactNode;
}