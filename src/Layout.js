import React from "react";
import Header from "./components/Header/Header";
import Sidenav from "./components/Sidenav/Sidenav";
import Main from "./components/Home/Main";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const pathname = ["/"];

  return (
    <>
      {pathname.includes(location.pathname) ? (
        <main>{children}</main>
      ) : (
        <>
          <Header />
          <Sidenav />
          <Main children={children} />
        </>
      )}
    </>
  );
}

export default Layout;
