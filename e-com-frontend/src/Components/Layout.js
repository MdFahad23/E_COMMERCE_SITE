import React, { useEffect } from "react";

import Menu from "./Menu";

const Layout = ({ title = "title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main>
      <Menu />
      <section>
        <div className={className}>{children}</div>
      </section>
    </main>
  );
};

export default Layout;
