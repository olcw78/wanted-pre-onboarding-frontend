import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Nav />
    <section className="container max-auto my-5 w-full px-10 h-screen">
      {children}
    </section>
    <Footer />
  </>
);
export default Layout;
