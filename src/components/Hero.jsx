import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CTAForm from "./CTAForm";

import useMediaQuery from "@mui/material/useMediaQuery";
import bg from "../assets/bg.png";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

export default function Hero() {
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
        width: "100%",
        background: "var(--primary-color)",
        // backgroundImage: "url('../assets/bg.png')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",

        minHeight: "46rem",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        padding: "4rem",

        marginBottom: { xs: "0rem", sm: "4rem" },

        position: "relative",
      }}
    >
      {/* HERO CONTENT CONTAINER */}
      <Box
        sx={{
          // background: "lightyellow",
          width: "144rem",

          display: "flex",
          justifyContent: { lg: "center" },
          maxHeight: { sm: "340px" },
          height: "100%",
          position: "relative",
        }}
      >
        {/* HERO IMAGE */}
        <Box
          sx={{
            // backgroundColor: "rgba(100, 20, 50, 0.25)",

            position: "absolute",

            bottom: { xs: "62%", sm: "-60px" },
            right: { xs: "30%", sm: "330px", md: 0 },

            maxWidth: {
              xs: language === "ru" || language === "en" ? "30%" : "40%",
              sm: "18%",
              md: "32%",
              lg: "27.5%",
              xl: "30%",
            },
          }}
        >
          <img
            src="https://res.cloudinary.com/dulasau/image/upload/v1707760608/GOMEDCZ/online-consultation_c7b3lt.png"
            alt="online-consultation"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
        {/* HERO IMAGE END */}
        <Box
          sx={{
            minWidth: { xs: "29rem", sm: "50rem", lg: "96rem" },
            // background: "salmon",

            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "4rem" },
            alignItems: "center",
          }}
        >
          {/* HERO TEXT CONTAINER */}
          <Box
            sx={{
              // background: "lightgreen",

              minHeight: "34rem",
              maxWidth: "40rem",

              display: "flex",
              paddingRight: {
                sm: "2rem",
                md: "16rem",
                lg: "4rem",
                xl: "2rem",
              },
              flexDirection: "column",
              justifyContent: { md: "center", lg: "space-between" },
              alignSelf: { sm: "flex-start", md: "center" },
              gap: { xs: "3rem", sm: "2rem", md: "3rem" },
              flex: { sm: "0 1 50%", md: "0 1 50%", lg: "0 1 50%" },
            }}
          >
            {/* HERO HEADING  */}

            <Typography
              sx={{
                fontFamily: "Montserrat",
                color: "var(--white)",
                fontSize: {
                  xs: "1.3rem",
                  sm: "1.4rem",
                  md: "1.6rem",
                  lg: language === "ru" ? "1.3rem" : "1.6rem",
                },
                fontWeight: "800",
                letterSpacing: "0.1em",
              }}
            >
              {/* Experience prompt healthcare with */}
              {translations["hero.title"]}
            </Typography>
            {/* HERO HEADING END */}

            {/* LOGO */}
            <Box
              sx={{
                maxWidth: {
                  xs: "140px",
                  sm: "180px",
                  md: "220px",
                  lg: "225px",
                },
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707332686/GOMEDCZ/July_Gomed_white_kipxq3.png"
                alt="gomed-logo"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
            {/* LOGO END */}

            {/* HERO DESCRIPTION */}
            <Typography
              sx={{
                fontFamily: "Montserrat",
                color: "var(--white)",
                fontSize: {
                  xs: "1.3rem",
                  sm: "1.4rem",
                  md: "1.2rem",
                  lg: language === "ru" ? "1.6rem" : "1.8rem",
                },
                letterSpacing: "0.02em",
              }}
            >
              <span id="cta" style={{}}></span>
              {translations["hero.text"]}
              <br></br>
              {translations["hero.text2"]}
              {/* Say goodbye to the long, anxiety-filled waits for medical
              appointments. <br></br>With Gomed, we assure you a confirmed
              doctor's appointment within a maximum of three days. */}
            </Typography>
            {/* HERO DESCRIPTION END */}
          </Box>
          {/* HERO TEXT CONTAINER END */}

          {/* FORM */}
          <Box
            sx={{
              alignSelf: "center",
              position: "absolute",
              top: { sm: "70%", md: "70%", lg: "82%" },
              right: { sm: "0", md: "33%", lg: "28%", xl: "30%" },
              transform: "translateY(-50%)",
              "@media screen and (max-width: 599px)": {
                position: "relative",
                top: "unset",
                right: "unset",
                transform: "unset",
              },
            }}
          >
            <CTAForm />
          </Box>
          {/* FORM END */}
        </Box>
      </Box>
      {/* HERO CONTENT CONTAINER END*/}
    </Box>
  );
}
