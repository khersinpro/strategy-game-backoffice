import AuthSideBar from "./auth-sidebar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            <AuthSideBar />
            <div className="flex flex-1 flex-col gap-4 lg:gap-6 mainAuth pb-4">
                {children}
            </div>
        </div>
    )
}