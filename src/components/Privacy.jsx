import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

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

export default function Privacy() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [privacy, setPrivacy] = useState([]);

  // console.log(privacy);
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

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

    // Fetch specialists based on the determined endpoint
    axios
      .get(privacysEndpoint)
      .then((response) => {
        setPrivacy(response.data);
      })
      .catch((error) => {
        console.error("Error fetching privacy:", error);
      });
  }, [language]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
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
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, fontFamily: "Montserrat", fontSize: "1.6rem" }}
        >
          {privacy}
        </Typography>
      </Box>
    </Modal>
  );
}
