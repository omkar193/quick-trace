import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
