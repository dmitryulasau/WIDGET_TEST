import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const decodedKey = CryptoJS.enc.Base64.parse(secretKey);
const hashedKey = CryptoJS.SHA256(decodedKey);

const encrypted = CryptoJS.AES.encrypt("a", hashedKey, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});

// MODAL STYLE
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: { xs: "35rem", sm: "45rem" },
  width: "100%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function Footer() {
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [privacy, setPrivacy] = useState([]);

  useEffect(() => {
    let privacysEndpoint = ""; // Initialize endpoint URL

    // Determine which endpoint to use based on the selected language
    switch (language) {
      case "cz":
        privacysEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/privacy-policy/cz";
        break;
      case "ru":
        privacysEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/privacy-policy/rus";
        break;
      default:
        privacysEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/privacy-policy/eng";
    }

    const config = {
      headers: {
        Authorization: `Bearer ${encrypted}`,
        "Content-Type": "application/json",
      },
    };

    // Fetch specialists based on the determined endpoint
    axios
      .get(privacysEndpoint, config)
      .then((response) => {
        setPrivacy(response.data);
      })
      .catch((error) => {
        console.error("Error fetching privacy:", error);
      });
  }, [language]);

  return (
    <Box
      sx={{
        background: "var(--primary-color)",
        color: "var(--white)",
        width: "100%",
        padding: "4rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "3rem",
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: { xs: "4rem", lg: 0 },
          }}
        >
          <img
            src="https://res.cloudinary.com/dulasau/image/upload/v1707332686/GOMEDCZ/July_Gomed_white_kipxq3.png"
            alt="contact-us"
            width="124px"
          />
        </Box>
        {/* LOGO END */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "2rem", lg: "14rem" },
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.8rem",
              letterSpacing: "0.02em",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={handleOpen}
          >
            {translations["footer.privacyPolicy"]}
            {/* Privacy Policy */}
          </Typography>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ maxHeight: "80vh", overflowY: "auto" }}>
              {/* <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Privacy Policy Gomed
              </Typography> */}
              {/* Render privacy policy HTML content directly inside Typography */}
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontFamily: "Montserrat", fontSize: "1.6rem" }}
                dangerouslySetInnerHTML={{ __html: privacy }}
              />
            </Box>
          </Modal>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <div
          style={{
            width: "100%",
            height: "0.1rem",
            backgroundColor: "var(--white)",
            borderRadius: "99rem",
          }}
        ></div>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.2rem",

              letterSpacing: "0.02em",
            }}
          >
            Gomed s.r.o.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.2rem",
              letterSpacing: "0.02em",
            }}
          >
            IČO: 21547025
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.2rem",
              letterSpacing: "0.02em",
            }}
          >
           Chudenická 1059/30, Hostivař
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.2rem",

              letterSpacing: "0.02em",
            }}
          >
            102 00 Praha 10
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.2rem",

              letterSpacing: "0.02em",
            }}
          >
            Česká republika
          </Typography>
        </Box>

        <Typography
          sx={{
            marginTop: "1rem",
            fontFamily: "Montserrat",
            color: "#ABABAB",
            fontSize: "1rem",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          {translations["footer.stickers"]}
          {/* Stickers designed by kerismaker from Flaticon */}
        </Typography>
      </Box>
    </Box>
  );
}
