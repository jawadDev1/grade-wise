
import Navbar from "@/components/elements/Navbar";
import Footer from "@/components/elements/Footer";

const Layout = ({ children }) => {
  

  return (
    <>
      
        <Navbar />
        <main>{children}</main>
        <Footer />
      
    </>
  );
};

export default Layout;
