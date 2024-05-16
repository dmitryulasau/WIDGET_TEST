import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

export default function Join() {
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  const handleScroll = (page) => {
    const targetId = window.innerWidth < 600 ? "cta" : "home";
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        padding: "4rem 4rem",
        height: { xs: "20vh", lg: "40vh" },
        marginBottom: { xs: "4rem", sm: "0" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          color: "var(--primary-color)",
          fontSize: "2.4rem",
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        {translations["join.title"]}
        {/* Ready to Prioritize Your Health and Time? */}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat",
          color: "var(--secondary-color)",
          fontSize: "2.4rem",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
          letterSpacing: "0.02em",
          textAlign: "center",
        }}
      >
        <a onClick={() => handleScroll("Home")}>
          {/* Join Our Waitlist Now */}
          {translations["join.subtitle"]}
        </a>
      </Typography>
    </Box>
  );
}
