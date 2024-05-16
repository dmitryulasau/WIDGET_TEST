import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

export default function Revolution() {
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  return (
    <Box
      sx={{
        maxWidth: "96rem",
        width: "100%",
        marginBottom: "8rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", lg: "row" },
          // gap: { xs: "2rem", lg: "20rem" },
          alignItems: "center",

          padding: { xs: "0 4rem" },
          width: "100%",
          // maxWidth: "96rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            gap: "1rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--secondary-color)",
              fontSize: "1.6rem",
            }}
          >
            {translations["revolution.title"]}
            {/* #HEALTHCAREREVOLUTION */}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--primary-color)",
              fontSize: "3.6rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              letterSpacing: "0.02em",
            }}
          >
            {translations["revolution.subtitle"]}
            {/* Gomed. Your Health, Accelerated. */}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--primary-color)",
              fontSize: "1.6rem",
              letterSpacing: "0.02em",
            }}
          >
            {translations["revolution.text"]}
            {/* Step into a new chapter of healthcare. Join our waitlist today and
            be among the first to embrace a service that values your health as
            much as your time. */}
          </Typography>
        </Box>
        {/* IMAGE APP */}
        <Box>
          <img
            src="https://res.cloudinary.com/dulasau/image/upload/v1707418458/GOMEDCZ/revolution_app_qkjebn.png"
            alt="gomed-app"
            style={{
              maxWidth: "354px",
              filter: "drop-shadow(10px 7px 10px #6d5fde",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
