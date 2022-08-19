import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-toastify/dist/ReactToastify.css";

import { EventsProvider } from "../context/events";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventsProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </EventsProvider>
  );
}

export default MyApp;
