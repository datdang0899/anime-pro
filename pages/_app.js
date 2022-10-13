import { AnimeProvider } from "../src/context/AnimeContext";
import Layout from "./layout";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AnimeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimeProvider>
  );
}

export default MyApp;
