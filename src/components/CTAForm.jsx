import React from "react";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";

import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import Joi from "joi"; // Import JOI for validation

import Checkbox from "@mui/material/Checkbox";

import Modal from "@mui/material/Modal";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const decodedKey = CryptoJS.enc.Base64.parse(secretKey);
const hashedKey = CryptoJS.SHA256(decodedKey);

const encrypted = CryptoJS.AES.encrypt("a", hashedKey, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});

// Define custom styles
const MuiTelInputWithFlags = styled(MuiTelInput)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    fontFamily: "Montserrat",
    color: "#000",
    fontSize: "1.4rem",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "var(--white)",
    border: "1px solid",
    borderColor: "var(--secondary-color)",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "var(--white)",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: `var(--secondary-color) 0 0 0 2px`,
      borderColor: "var(--secondary-color)",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Montserrat",
    color: "#787878",
    fontSize: "1.4rem",
    "&.Mui-focused": {
      color: "var(--secondary-color)",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "var(--error-color)",
    fontSize: "1.1rem",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    // Override error text color
    color: "var(--error-color)",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#656565",
  },
  "& .MuiFilledInput-root.Mui-error": {
    borderColor: "var(--error-color)",
    boxShadow: `var(--error-color) 0 0 0 2px`,
  },
}));

const CssTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    fontFamily: "Montserrat",
    color: "#000",
    fontSize: "1.4rem",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "var(--white)",
    border: "1px solid",
    borderColor: "var(--secondary-color)",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "var(--white)",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: `var(--secondary-color) 0 0 0 2px`,
      borderColor: "var(--secondary-color)",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Montserrat",
    color: "#787878",
    fontSize: "1.4rem",
    "&.Mui-focused": {
      color: "var(--secondary-color)",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "var(--error-color)",
    fontSize: "1.1rem",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    // Override error text color
    color: "var(--error-color)",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#656565",
  },
  "& .MuiFilledInput-root.Mui-error": {
    borderColor: "var(--error-color)",
    boxShadow: `var(--error-color) 0 0 0 2px`,
  },
}));

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

const otherTranslations = {
  en: "Other",
  ru: "Другая",
  cz: "Další",
};

export default function CTAForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const partnerName = urlParams.get("partnerName");

  // Check if partnerName is not provided or is an empty string
  const partner = partnerName !== null && partnerName !== "" ? partnerName : "";

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

  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    insuranceProvider: "",
    specialists: [],
    language: navigator.language || navigator.userLanguage,
    partner: partner,
  });

  const [errors, setErrors] = useState({});

  const [checkboxError, setCheckboxError] = useState("");

  useEffect(() => {
    setIsChecked(false);

    setCheckboxError("");
  }, [language]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // Clear checkbox error when checkbox is checked
    if (event.target.checked) {
      setCheckboxError("");
    }
  };

  // GET INSURANCE
  useEffect(() => {
    const insuranceEndpoint =
      "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/static-data/insurance_providers";

    const config = {
      headers: {
        Authorization: `Bearer ${encrypted}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(insuranceEndpoint, config)
      .then((response) => {
        setInsuranceProviders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching insurance providers:", error);
      });
  }, []);

  // GET SPECIALISTS
  useEffect(() => {
    let specialistsEndpoint = ""; // Initialize endpoint URL

    // Determine which endpoint to use based on the selected language
    switch (language) {
      case "cz":
        specialistsEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/static-data/specialists_cz";
        break;
      case "ru":
        specialistsEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/static-data/specialists_rus";
        break;
      default:
        specialistsEndpoint =
          "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/static-data/specialists_eng";
    }

    const config = {
      headers: {
        Authorization: `Bearer ${encrypted}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(specialistsEndpoint, config)
      .then((response) => {
        setSpecialists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specialists:", error);
      });
  }, [language]);

  // Function to handle phone number changes
  function handlePhoneNumberChange(value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: value,
    }));
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "specialists") {
      // If the selected value is an array, directly set it, otherwise convert it to an array
      const updatedSpecialists = Array.isArray(value) ? value : [value];
      setFormData({
        ...formData,
        [name]: updatedSpecialists,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    // formData.phoneNumber = formData.phoneNumber.
    const { error } = schema.validate(formData, { abortEarly: false });

    let hasErrors = false;

    // Check if the privacy policy checkbox is not checked
    if (!isChecked) {
      // If privacy policy checkbox is not checked, set checkbox error
      setCheckboxError(errorMessages[language].privacyPolicy);
      hasErrors = true;
    } else {
      setCheckboxError(""); // Clear checkbox error if checked
    }

    // Clear any previous validation errors
    setErrors({});

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.key] = detail.message;
      });
      setErrors(validationErrors);
      hasErrors = true;
    }

    console.log(error);
    // If there are any errors, exit the function early
    if (hasErrors) return;

    const payload = {
      phoneNumber: formData.phoneNumber,
      insuranceProvider: formData.insuranceProvider,
      email: formData.email,
      language: formData.language,
      specialists: formData.specialists,
      isPrivacyPolicyConsentGiven: isChecked,
      partner: formData.partner,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${encrypted}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://gomed-crud-backend-0230dd55a01f.herokuapp.com/guests",
        payload,
        config
      )
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setFormData({
          email: "",
          phoneNumber: "",
          insuranceProvider: "",
          specialists: [],
          language: "",
          partner: "",
        });
        setErrors({});
        toast.success("Thank you for joining our list!", {
          id: "join-list-toast",
        });
        setIsChecked(false);
      })
      .catch((error) => {
        // Handle errors
        // console.log(formData);
        // console.log(payload);
        console.error("Error submitting form:", error);

        toast.error("Something went wrong", {
          id: "error-toast",
        });
      });
  };

  useEffect(() => {
    setFormData({
      email: "",
      phoneNumber: "",
      insuranceProvider: "",
      specialists: [],
      language: navigator.language || navigator.userLanguage,
      partner: partner,
    });
    setErrors({});
  }, [language]);

  const errorMessages = {
    en: {
      emailEmpty: "Email is required",
      email: "Please enter a valid email address",
      phoneNumberEmpty: "Phone number is required",
      phoneNumber: "Phone number with country code",
      insuranceProvider: "Please choose your medical insurance",
      specialists: "Please choose specialists",
      privacyPolicy: "Please agree to the privacy policy",
    },
    cz: {
      emailEmpty: "E-mail je povinný",
      email: "Prosím zadejte platnou e-mailovou adresu",
      phoneNumberEmpty: "Telefonní číslo je povinné",
      phoneNumber: "Telefonní číslo s kódem země",
      insuranceProvider: "Prosím vyberte svoje pojištění",
      specialists: "Prosím vyberte specialisty",
      privacyPolicy: "Souhlas s ochranou osobních údajů je povinný",
    },
    ru: {
      emailEmpty: "Требуется электронная почта",
      email: "Пожалуйста, введите действительный адрес электронной почты",
      phoneNumberEmpty: "Требуется номер телефона",
      phoneNumber: "Номер телефона с кодом страны",
      insuranceProvider: "Пожалуйста, выберите свою медицинскую страховку",
      specialists: "Пожалуйста, выберите специалистов",
      privacyPolicy: "Пожалуйста, согласитесь с политикой конфиденциальности",
    },
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": errorMessages[language].emailEmpty,
        "string.email": errorMessages[language].email,
        "any.required": errorMessages[language].emailEmpty,
      }),
    phoneNumber: Joi.string()
      .pattern(new RegExp("^\\+\\d{7,20}$"))
      .required()
      .messages({
        "string.empty": errorMessages[language].phoneNumberEmpty,
        "string.pattern.base": errorMessages[language].phoneNumber,
        "any.required": errorMessages[language].phoneNumberEmpty,
      }),
    insuranceProvider: Joi.string().required().messages({
      "string.empty": errorMessages[language].insuranceProvider,
      "any.required": errorMessages[language].insuranceProvider,
    }),
    specialists: Joi.array().min(1).items(Joi.string()).required().messages({
      "array.min": errorMessages[language].specialists,
      "array.base": errorMessages[language].specialists,
      "array.required": errorMessages[language].specialists,
      "any.required": errorMessages[language].specialists,
    }),
    language: Joi.string().required(),
    partner: Joi.string().allow(""),
  });

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
    <Box sx={{ maxWidth: "29rem" }}>
      <div id="CTA" style={{}}></div>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          bottom: "50%",
        }}
        toastOptions={{
          className: "",
          style: {
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "bold",
            padding: "40px 20px",
            // border: "6px solid #61D345",
          },
        }}
      />

      <Paper
        elevation={20}
        sx={{
          background: "var(--blue)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem 1.6rem",
          borderRadius: "1.5rem",
          minHeight: "58rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        ></Box>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            color: "var(--white)",
            fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem" },
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 2rem",
            letterSpacing: "0.08em",
          }}
        >
          {translations["ctaform.title"]}
          {/* READY FOR A HEALTHIER TOMORROW? */}
        </Typography>

        {/* EMAIL */}
        <CssTextField
          name="email"
          label={translations["ctaform.email"]}
          variant="filled"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            width: "100%",
          }}
        />

        {/* PHONE */}
        <MuiTelInputWithFlags
          defaultCountry={"CZ"}
          name="phoneNumber"
          variant="filled"
          label={translations["ctaform.phone"]}
          onChange={handlePhoneNumberChange}
          value={formData.phoneNumber}
          fullWidth={true}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          disableFormatting={true}
          inputProps={{ maxLength: 20 }}
          InputProps={{ disableUnderline: true }}
        />

        {/* INSURANCE */}
        <CssTextField
          name="insuranceProvider"
          select
          label={translations["ctaform.insurance"]}
          variant="filled"
          value={formData.insuranceProvider}
          onChange={handleInputChange}
          error={!!errors.insuranceProvider}
          helperText={errors.insuranceProvider}
          sx={{ width: "100%" }}
        >
          {[...insuranceProviders, "Other"].map((insuranceProvider, index) => (
            <MenuItem
              sx={{
                fontFamily: "Montserrat",
                letterSpacing: "0.1em",
                color: "#787878",
              }}
              key={index}
              value={insuranceProvider}
            >
              {insuranceProvider === "Other"
                ? otherTranslations[language]
                : insuranceProvider}
            </MenuItem>
          ))}
        </CssTextField>

        {/* SPECIALIST */}
        <CssTextField
          name="specialists"
          select
          label={translations["ctaform.specialist"]}
          variant="filled"
          value={formData.specialists}
          onChange={handleInputChange}
          error={!!errors.specialists}
          helperText={errors.specialists}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => {
              return selected
                .map((selectedSpecialist) => {
                  return (
                    selectedSpecialist.charAt(0).toUpperCase() +
                    selectedSpecialist.slice(1)
                  );
                })
                .join(", ");
            },
          }}
          sx={{ width: "100%" }}
        >
          {specialists.map((specialist, index) => (
            <MenuItem
              key={index}
              value={specialist}
              sx={{
                fontFamily: "Montserrat",
                letterSpacing: "0.1em",
                color: "#787878",
              }}
            >
              <Checkbox
                checked={formData.specialists.includes(specialist)}
                sx={{
                  "&.MuiCheckbox-root": {
                    color: "var(--secondary-color)",
                  },
                  "& .MuiSvgIcon-root": { fontSize: "2rem" },
                  "&.Mui-checked": {
                    color: "var(--secondary-color)", // Change the color when the checkbox is checked
                  },
                }}
              />
              {specialist.length > 20
                ? `${(
                    specialist.charAt(0).toUpperCase() + specialist.slice(1)
                  ).substring(0, 20)}...`
                : specialist.charAt(0).toUpperCase() + specialist.slice(1)}
            </MenuItem>
          ))}
        </CssTextField>
        <Button
          sx={{
            fontFamily: "Montserrat",
            color: "var(--white)",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "1.2rem",
            padding: "0.3rem 4rem",

            background: "var(--secondary-color)",
            "&:hover": {
              background: "#9dd9f4",
              color: "var(--primary-color)",
            },
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          {translations["ctaform.submit"]}
          {/* Join our priority waitlist */}
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
            name="agreeToPrivacyPolicy"
            sx={{
              "&.MuiCheckbox-root": {
                color: checkboxError
                  ? "var(--error-color)"
                  : "var(--secondary-color)",
              },
              "& .MuiSvgIcon-root": { fontSize: "2rem" },
              "&.Mui-checked": {
                color: "var(--secondary-color)", // Change the color when the checkbox is checked
              },
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Montserrat",
                color: "var(--white)",
                fontSize: "1.4rem",
              }}
            >
              {translations["ctaform.privacy"]}
              {/* I have read and agree to the */}
              <span
                className="hover-effect"
                style={{
                  cursor: "pointer",
                  color: "var(--secondary-color)",
                  textDecoration: "none",
                  transition: "text-decoration 0.3s ease",
                }}
                onClick={handleOpen}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")} // Remove underline when not hovered
              >
                {translations["ctaform.privacy2"]}

                {/* privacy policy */}
              </span>
              {language === "cz" && translations["ctaform.privacyCZ"]}
            </Typography>

            {checkboxError && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                  color: "var(--error-color)",
                }}
              >
                {checkboxError}
              </Typography>
            )}
          </Box>
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
      </Paper>
    </Box>
  );
}
