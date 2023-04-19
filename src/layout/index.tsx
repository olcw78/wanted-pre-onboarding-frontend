import type { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Nav />
    <section className="container mx-auto my-5 w-full px-10 min-h-screen">
      {children}
    </section>
    <Footer />
  </>
);
export default Layout;
