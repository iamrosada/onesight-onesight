import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>onesight calendário</title>
      </Head>
      <header>{/* <Navbar /> */}</header>
      <main className="main-container">{children}</main>
      {/* <footer></footer> */}
    </div>
  );
};

export default Layout;
