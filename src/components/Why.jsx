import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

export default function Why() {
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
        marginTop: { lg: "8rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          alignItems: "center",
          minHeight: "52.5rem",

          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            height: { lg: "35vh" },

            width: "100%",

            textAlign: "center",
            padding: "0rem 4rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--primary-color)",
              fontSize: "2.4rem",
              fontWeight: "bold",
              letterSpacing: "0.02em",
            }}
          >
            {translations["why.title"]}
            {/* Why choose Gomed? */}
          </Typography>

          <div
            style={{
              width: "10rem",
              height: "0.3rem",
              backgroundColor: "var(--secondary-color)",
              borderRadius: "99rem",
            }}
          ></div>

          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--primary-color)",
              fontSize: "1.6rem",
              marginBottom: "10rem",
              textAlign: "center",
              letterSpacing: "0.02em",
              padding: "4rem",
            }}
          >
            {translations["why.subtitle"]}
            <br></br>
            {translations["why.subtitle2"]}

            {/* Urgent Care at Your Fingertips:{" "}
            <br></br>Fast, Reliable, Personalized */}
          </Typography>
        </Box>

        {/* CARDS CONTAINER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            flexWrap: { sm: "wrap" },
            justifyContent: { sm: "center", md: "center", lg: "space-between" },
            gap: { xs: "12rem", lg: "0rem" },
            alignItems: { xs: "center", sm: "stretch" },
          }}
        >
          {/* EMERGENCY */}
          <Paper
            elevation={5}
            sx={{
              position: "relative",
              maxWidth: "29rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderRadius: "2rem",
              padding: "3rem",
            }}
          >
            {/* IMAGE CONTAINER */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "-32%", sm: "-30%" },
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707418252/GOMEDCZ/why_emergency_nft5l2.png"
                alt="emergency"
                width="228px"
              ></img>
            </Box>
            <Box sx={{ minHeight: "8.2rem" }}></Box>
            {/* IMAGE CONTAINER END */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  color: "var(--primary-color)",
                  fontSize: "1.8rem",
                  letterSpacing: "0.02em",
                }}
              >
                {translations["why.reason1"]}
                {/* Speedy Healthcare */}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",

                  color: "var(--primary-color)",
                  fontSize: "1.6rem",
                  letterSpacing: "0.02em",
                }}
              >
                {translations["why.reason1text"]}
                {/* Gomed values your time. Get the medical care you need, fast. No
                more waiting for urgent care. */}
              </Typography>
            </Box>
          </Paper>
          {/* EMERGENCY END */}

          {/* APPOINTMENT */}
          <Paper
            elevation={5}
            sx={{
              position: "relative",
              maxWidth: "29rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderRadius: "2rem",
              padding: "3rem",
            }}
          >
            {/* IMAGE CONTAINER */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "-27%", sm: "-30%" },
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707418252/GOMEDCZ/why_appointment_fg3skg.png"
                alt="appointment"
                width="228px"
              ></img>
            </Box>
            <Box sx={{ minHeight: "8.2rem" }}></Box>
            {/* IMAGE CONTAINER END */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  color: "var(--primary-color)",
                  fontSize: "1.8rem",
                  letterSpacing: "0.02em",
                  fontWeight: "bold",
                }}
              >
                {translations["why.reason2"]}
                {/* Flexible Options */}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  color: "var(--primary-color)",
                  fontSize: "1.6rem",
                  letterSpacing: "0.02em",
                }}
              >
                {translations["why.reason2text"]}
                {/* Pick your healthcare plan like a ride. 'Economy' for an
                appointment within 48 hours, 'Premium' for same-day
                consultation. Your health, your way. */}
              </Typography>
            </Box>
          </Paper>
          {/* APPOINTMENT END */}
          {/* RECOVERY */}
          <Paper
            elevation={5}
            sx={{
              position: "relative",
              maxWidth: "29rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderRadius: "2rem",
              padding: "3rem",
            }}
          >
            {/* IMAGE CONTAINER */}
            <Box
              sx={{
                position: "absolute",
                top: "-30%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707789023/why_recovery_jqf5dp.png"
                alt="recovery"
                width="228px"
              ></img>
            </Box>
            <Box sx={{ minHeight: "8.2rem" }}></Box>
            {/* IMAGE CONTAINER END */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  color: "var(--primary-color)",
                  fontSize: "1.8rem",
                  letterSpacing: "0.02em",
                  fontWeight: "bold",
                }}
              >
                {translations["why.reason3"]}
                {/* Trusted Professionals */}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  color: "var(--primary-color)",
                  fontSize: "1.6rem",
                  letterSpacing: "0.02em",
                }}
              >
                {translations["why.reason3text"]}
                {/* Our network is your advantage. Only the best doctors, ready for
                quick appointments. Every visit promises quality care. */}
              </Typography>
            </Box>
          </Paper>
          {/* RECOVERY END */}
        </Box>
        {/* CARDS CONTAINER END */}
      </Box>
    </Box>
  );
}
