import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ClickParticles from "../ui/ClickParticles";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <ClickParticles />
      <Navbar />
      <main className={`flex-1 ${isHome ? "" : "pt-24"}`}>{children}</main>
      <Footer />
    </div>
  );
}
