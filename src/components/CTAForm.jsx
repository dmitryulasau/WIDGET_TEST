import React from "react";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

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

import emailjs from "emailjs-com";
import { useRef } from "react";

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

const otherTranslationsSpec = {
  en: "Other",
  ru: "Другой",
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

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    switch (language) {
      case "cz":
        setSubject("Potvrzení vaší žádosti k Gomed");
        setMessage(
          `Zdravíme Vás!\n\nDěkujeme, že jste se obrátili na Gomed! \nVaši žádost jsme přijali a ozveme se Vám co nejdříve e-mailem.\n\nS pozdravem,\nTým Gomed`
        );
        break;
      case "ru":
        setSubject("Подтверждение вашего запроса в Gomed");
        setMessage(
          `Приветствуем Вас!\n\nБлагодарим Вас за обращение в Gomed! \nМы получили Ваш запрос и свяжемся с Вами по электронной почте в ближайшее время.\n\nС наилучшими пожеланиями,\nКоманда Gomed`
        );
        break;
      default:
        setSubject("Confirmation of Your Request to Gomed");
        setMessage(
          `Greetings!\n\nThank you for reaching out to us!\nWe have received your request and are currently reviewing it and we will get back to you via email as soon as possible.\n\nBest regards,\nGomed Team`
        );
    }
  }, [language]);

  const translatedOther =
    otherTranslationsSpec[language] || otherTranslations.en;

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
    location: "",
    description: "",
    language: navigator.language || navigator.userLanguage,
    partner: partner,
    subject: subject,
    message: message,
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

  // EMAIL
  const form = useRef(null);

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const appointmentTemplateId = import.meta.env.VITE_APPOINTMENT_TEMPLATE_ID;
  const userId = import.meta.env.VITE_USER_ID;
  const personalEmailTemplateId = import.meta.env.VITE_CLIENT_INFO_TEMPLATE_ID;

  const sendEmail = (formData) => {
    console.log(formData);

    if (form.current) {
      // console.log(form.current);

      // Send the client email along with the form data and emailDataClient
      emailjs
        .sendForm(serviceId, appointmentTemplateId, form.current, userId)
        .then(
          (result) => {
            console.log("Client email successfully sent!", result.text);

            const partnerDisplay = formData.partner
              ? formData.partner
              : "No partner";

            const personalEmailData = {
              email: formData.email,
              phonenumber: formData.phoneNumber,
              insurance: formData.insuranceProvider,
              location: formData.location,
              specialists: formData.specialists.join(", "),
              services: formData.description,
              language: language,
              partner: partnerDisplay,
            };

            // Send the personal email
            emailjs
              .send(
                serviceId,
                personalEmailTemplateId,
                personalEmailData,
                userId
              )
              .then(
                (personalResult) => {
                  console.log(
                    "Personal email successfully sent!",
                    personalResult.text
                  );
                },
                (personalError) => {
                  console.error(
                    "Personal email sending failed:",
                    personalError.text
                  );
                }
              );
          },
          (error) => {
            console.error("Client email sending failed:", error.text);
          }
        );
    } else {
      console.error("Form element not found or not mounted yet.");
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    sendEmail(formData);
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
      location: formData.location,
      description: formData.description,
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
          location: "",
          description: "",
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
      location: "",
      description: "",
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
      insuranceProvider: "Insurance is required",
      specialists: "Specialist is required",
      location: "Location is required",
      description: "Please fill in this field",
      privacyPolicy: "Please agree to the privacy policy",
    },
    cz: {
      emailEmpty: "E-mail je povinný",
      email: "Prosím zadejte platnou e-mailovou adresu",
      phoneNumberEmpty: "Telefonní číslo je povinné",
      phoneNumber: "Telefonní číslo s kódem země",
      insuranceProvider: "Pojištění je vyžadováno",
      specialists: "Je vyžadován specialista",
      location: "Místo je povinné",
      description: "Vyplňte prosím toto pole",
      privacyPolicy: "Souhlas s ochranou osobních údajů je povinný",
    },
    ru: {
      emailEmpty: "Требуется электронная почта",
      email: "Пожалуйста, введите действительный адрес электронной почты",
      phoneNumberEmpty: "Требуется номер телефона",
      phoneNumber: "Номер телефона с кодом страны",
      insuranceProvider: "Требуется страховка",
      specialists: "Требуется специалист",
      location: "Укажите местоположение",
      description: "Пожалуйста, заполните это поле",
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
    location: Joi.string().required().messages({
      "string.empty": errorMessages[language].location,
      "any.required": errorMessages[language].location,
    }),
    description: Joi.string().required().messages({
      "string.empty": errorMessages[language].description,
      "any.required": errorMessages[language].description,
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
    <Box
      sx={{
        width: {
          xs: "92vw",
          sm: "50vw",
          md: "40vw",
          lg: "30vw",
          xl: "19vw",
        },
      }}
    >
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
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem 1.6rem",
          borderRadius: "1.5rem",
          minHeight: "62rem",
          zIndex: "1000",
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

            fontWeight: "800",
            textAlign: "center",
            padding: "0 2rem",
            letterSpacing: "0.08em",
          }}
        >
          <Box
            sx={{
              mb: 1,
              fontSize: { xs: "1.6rem", sm: "1.8rem", md: "1.8rem" },
            }}
          >
            {translations["widget.heading"]}
          </Box>
          <Box
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.8rem", md: "1.4rem" },
              mb: "0.5rem",
            }}
          >
            {translations["widget.subheading"]}
          </Box>
        </Typography>

        <form
          id="form"
          ref={form}
          style={{
            display: "flex",
            gap: "0.8rem",
            flexDirection: "column",

            maxWidth: "95%",
          }}
        >
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

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "1rem",

              justifyContent: "space-between",
            }}
          >
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
              {[...insuranceProviders, "Other"].map(
                (insuranceProvider, index) => (
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
                )
              )}
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
              {[...specialists, translatedOther].map((specialist, index) => (
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
          </Box>

          {/* LOCATION */}
          <CssTextField
            name="location"
            label={translations["widget.location"]}
            variant="filled"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            error={!!errors.location}
            helperText={errors.location}
            sx={{
              width: "100%",
            }}
          />
          {/* LOCATION END */}

          {/* DESCRIPTION */}
          <CssTextField
            name="description"
            label={translations["widget.service"]}
            variant="filled"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={2}
            sx={{
              width: "100%",
            }}
          />
          {/* DESCRIPTION END */}

          <Button
            sx={{
              width: "100%",
              fontFamily: "Montserrat",
              color: "var(--white)",
              fontSize: "1.6rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "1.2rem",
              padding: "1rem 4rem",

              background: "var(--secondary-color)",
              "&:hover": {
                background: "#9dd9f4",
                color: "var(--primary-color)",
              },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            {translations["widget.submit"]}
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

          <input type="hidden" name="subject" value={subject} />
          <input type="hidden" name="message" value={message} />
        </form>
      </Paper>
    </Box>
  );
}
