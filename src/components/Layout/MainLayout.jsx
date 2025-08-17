import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
