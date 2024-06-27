import React from "react";
import Header from "./components/Header/Header";
import Sidenav from "./components/Sidenav/Sidenav";
import Main from "./components/Home/Main";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Sidenav />
      <Main children={children} />
    </div>
  );
}

export default Layout;
