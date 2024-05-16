import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";
import { Helmet } from "react-helmet";

export default function ContactUs() {
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  let title, description;

  // Set title and meta description based on language
  switch (language) {
    case "en":
      title = "Find Top Doctors in Prague Fast - Book Your Appointment Today";
      description =
        "Instantly find and book appointments with leading doctors in Prague. Our easy-to-use platform connects you with healthcare professionals. Get fast, reliable medical care today.";
      break;
    case "cz":
      title =
        "Najděte nejlepší lékaře v Praze rychle - Rezervujte si svou návštěvu již dnes";
      description =
        "Okamžitě najděte a rezervujte si schůzky s předními lékaři v Praze. Naše snadno použitelná platforma vás spojí se zdravotnickými profesionály. Získejte rychlou a spolehlivou lékařskou péči již dnes.";
      break;
    case "ru":
      title =
        "Быстро Найдите Лучших Врачей в Праге - Запишитесь на Прием Сегодня";
      description =
        "Мгновенно находите и записывайтесь на прием к ведущим врачам Праги. Наш удобный сайт свяжет вас с профессионалами здравоохранения. Получите быструю и надежную медицинскую помощь уже сегодня.";
      break;
    default:
      title = "Find Top Doctors in Prague Fast - Book Your Appointment Today";
      description =
        "Instantly find and book appointments with leading doctors in Prague. Our easy-to-use platform connects you with healthcare professionals. Get fast, reliable medical care today.";
  }

  return (
    <>
      {" "}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Box
        sx={{
          background: "var(--bg-light)",
          width: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 4rem",
          gap: "2rem",
        }}
      >
        <Box>
          <img
            src="https://res.cloudinary.com/dulasau/image/upload/v1707418251/GOMEDCZ/contact_hgedzu.png"
            alt="contact-us"
            style={{ maxWidth: "137px" }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            color: "var(--primary-color)",
            fontSize: "2.4rem",
            padding: "1rem",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          {translations["contact.title"]}
          {/* Have any questions? Contact us! */}
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
            marginTop: "3rem",
            fontFamily: "Montserrat",
            color: "var(--primary-color)",
            fontSize: "1.6rem",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "8rem",
            letterSpacing: "0.02em",
          }}
        >
          {translations["contact.subtitle"]}{" "}
          {/* Reach out to us directly at{" "} */}
          <span>
            <a
              href="mailto:info@gomed.cz"
              style={{ color: "var(--secondary-color)", cursor: "pointer" }}
            >
              info@gomed.cz
            </a>
          </span>
          {/* , <br></br>or drop your message in our contact form. */}
        </Typography>
      </Box>
    </>
  );
}
