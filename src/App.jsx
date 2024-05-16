import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Container from "@mui/material/Container";
import Why from "./components/Why.jsx";
import Revolution from "./components/Revolution.jsx";
import Join from "./components/Join.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";

import "smoothscroll-polyfill";
import Widget from "./components/Widget.jsx";
import zIndex from "@mui/material/styles/zIndex.js";

window.__forceSmoothScrollPolyfill__ = true;

function App() {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          padding: "0 !important",
          margin: "0 !important",
          width: "100%",
        }}
      >
        <div id="home" style={{}}></div>
        <Navbar />
        {/* MAIN CONTENT */}

        <Hero />
        <div style={{ height: "6rem" }}></div>
        <div id="why" style={{ height: "8rem" }}></div>
        <Why />
        <div id="revolution" style={{ height: "8rem" }}></div>
        <Revolution />
        <Join />

        <div id="contact" style={{ height: "4rem" }}></div>
        <ContactUs />
        <Footer />

        {/* MAIN CONTENT END*/}
      </Container>
      <Widget />
    </>
  );
}

export default App;
