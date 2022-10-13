import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <div className="container">
      <ToastContainer />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
