import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
            <Header />
            <Menu />

            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}