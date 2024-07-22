import { Outlet } from "react-router-dom";
import { Container } from "@/shared/ui/container";
import { Header } from "@/features/header";
import { NavBar } from "@/shared/ui/nav-bar";

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  );
};
