import React, { useState, useEffect } from "react";

import Fab from "@mui/material/Fab";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import emailjs from "emailjs-com";

// VALIDATION
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// LANGUAGES
import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import { useContext } from "react";

import { useRef } from "react";

import axios from "axios";
import CryptoJS from "crypto-js";

import MenuItem from "@mui/material/MenuItem";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const decodedKey = CryptoJS.enc.Base64.parse(secretKey);
const hashedKey = CryptoJS.SHA256(decodedKey);

const encrypted = CryptoJS.AES.encrypt("a", hashedKey, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});

const otherTranslations = {
  en: "Other",
  ru: "Другая",
  cz: "Další",
};

function Widget() {
  // GET INSURANCE
  const [insuranceProviders, setInsuranceProviders] = useState([]);

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

  // LANGUAGES
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context
  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  const form = useRef(null);

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  //TODO
  const appointmentTemplateId = import.meta.env.VITE_APPOINTMENT_TEMPLATE_ID;
  const userId = import.meta.env.VITE_USER_ID;
  const personalEmailTemplateId = "template_ces3y3j"; //TODO

  // EMAIL

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Populate subject and message based on selected language
    switch (language) {
      case "cz":
        setSubject("Potvrzení vaší žádosti k Gomed");
        setMessage(
          `Zdravíme Vás!\n\nDěkujeme, že jste se obrátili na Gomed! \nVaši žádost jsme přijali a aktuálně pro vás vyhledáváme nejlepší možnou variantu. \nOzveme se vám co nejdříve e-mailem.\n\nS pozdravem,\nTým Gomed`
        );
        break;
      case "ru":
        setSubject("Подтверждение вашего запроса в Gomed");
        setMessage(
          `Приветствуем вас!\n\nБлагодарим вас за обращение в Gomed! \nМы получили ваш запрос и сейчас подбираем для вас наилучший вариант. \nМы свяжемся с вами по электронной почте в ближайшее время.\n\nС наилучшими пожеланиями,\nКоманда Gomed`
        );
        break;
      default:
        setSubject("Confirmation of Your Request to Gomed");
        setMessage(
          `Greetings!\n\nThank you for reaching out to us! \nWe have received your request and are currently reviewing it. \nWe are searching for the soonest and best option to meet your needs. We will get back to you via email as soon as possible.\n\nBest regards,\nGomed Team`
        );
    }
  }, [language]);

  const sendEmail = (formData) => {
    console.log(formData);

    const personalEmail = import.meta.env.VITE_PERSONALEMAIL;

    if (form.current) {
      console.log(form.current);

      // Send the client email along with the form data and emailDataClient
      emailjs
        .sendForm(serviceId, appointmentTemplateId, form.current, userId)
        .then(
          (result) => {
            console.log("Client email successfully sent!", result.text);
            setSubmitted(true);

            const personalEmailData = {
              to_email: personalEmail,
              email: formData.email,
              phonenumber: formData.phonenumber,
              insurance: formData.insurance,
              location: formData.location,
              services: formData.services,
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

  // VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    insurance: Yup.string().required(translations["widget.error.insurance"]),
    email: Yup.string()
      .email(translations["widget.error.invalidemail"])
      .required(translations["widget.error.emailrequired"]),
    location: Yup.string().required(translations["widget.error.location"]),
    phonenumber: Yup.string()
      .matches(/^[0-9]+$/, translations["widget.error.phonedigits"])
      .min(7, translations["widget.error.phoneshort"])
      .required(translations["widget.error.phonerequired"]),
    services: Yup.string().required(translations["widget.error.service"]),
  });

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phonenumber: "",
    insurance: "",
    location: "",
    services: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const fabStyle = {
    backgroundColor: formVisible ? "#8e8e93" : "#53d769",
  };

  const inputstyle = {
    marginTop: "0.8rem",
    marginBottom: "0rem",
    "& .MuiFilledInput-root": {
      fontFamily: "Montserrat",
      color: "#000",
      fontSize: "1.4rem",
      overflow: "hidden",
      borderRadius: "1.2rem",
      backgroundColor: "var(--white)",
      border: "1px solid",
      borderColor: "var(--secondary-color)",
      "&:hover": {
        backgroundColor: "var(--white)",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: `var(--secondary-color) 0 0 0 2px`,
        borderColor: "var(--secondary-color)",
      },
    },

    "& .MuiFormHelperText-root": {
      color: "var(--error-color)",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Montserrat",
      color: "#787878",
      fontSize: "1.4rem",
      "&.Mui-focused": {
        color: "var(--secondary-color)",
      },
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "var(--error-color)",
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "#656565",
    },
    "& .MuiFilledInput-root.Mui-error": {
      borderColor: "green",
      boxShadow: `var(--error-color) 0 0 0 2px`,
    },
  };

  useEffect(() => {
    setFormData({
      email: "",
      phonenumber: "",
      insurance: "",
      location: "",
      services: "",
    });
  }, [language]);

  return (
    <div>
      <Fab
        style={fabStyle}
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? (
          <CloseIcon sx={{ fontSize: "30px", color: "white" }} />
        ) : (
          <PhoneIphoneIcon sx={{ fontSize: "30px", color: "white" }} />
        )}
      </Fab>

      {formVisible && !submitted && (
        <Formik
          key={language}
          initialValues={{
            email: "",
            phonenumber: "",
            insurance: "",
            location: "",
            services: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm, ...other }) => {
            sendEmail(values, other);
            setSubmitting(false);
            // Display thank you message
            setSubmitted(true);
            // Hide the form after submission
            setTimeout(() => {
              setFormVisible(false);
              resetForm();
              setSubmitted(false);
            }, 4000);
          }}
        >
          {({ isSubmitting }) => (
            <Form ref={form}>
              <Box
                sx={{
                  position: "absolute",
                  width: {
                    xs: "92vw",
                    sm: "50vw",
                    md: "40vw",
                    lg: "30vw",
                    xl: "20vw",
                  },

                  bottom: 80,
                  right: 16,
                  backgroundColor: "var(--blue)",
                  padding: "2rem",
                  borderRadius: 4,
                  boxShadow:
                    "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;",
                  zIndex: 999,

                  overflowY: "auto",
                  maxHeight: "calc(100vh - 100px)",
                }}
              >
                <Box
                  sx={{
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    fontWeight: "800",
                    color: "#fff",
                    lineHeight: "1.1",
                    fontSize: "1.8rem",
                    letterSpacing: "5%",
                    marginBottom: "0.8rem",
                  }}
                >
                  <Box sx={{ mb: 1 }}>{translations["widget.heading"]}</Box>

                  {translations["widget.subheading"]}
                </Box>
                {/* <Grid container spacing={2}>
                  <Grid item xs={6}>
                  
                    <Field
                      InputProps={{ disableUnderline: true }}
                      sx={inputstyle}
                      name="firstname"
                      variant="filled"
                      type="text"
                      label={translations["widget.firstname"]}
                      as={TextField}
                      fullWidth
                      margin="normal"
                      helperText={
                        <div style={{ color: "var(--error-color)" }}>
                          <ErrorMessage name="firstname" component="div" />
                        </div>
                      }
                    />
              
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      InputProps={{ disableUnderline: true }}
                      sx={inputstyle}
                      variant="filled"
                      name="lastname"
                      type="text"
                      label={translations["widget.lastname"]}
                      as={TextField}
                      fullWidth
                      margin="normal"
                      helperText={
                        <div style={{ color: "var(--error-color)" }}>
                          <ErrorMessage name="lastname" component="div" />
                        </div>
                      }
                    />
                  </Grid>
                </Grid> */}

                {/* EMAIL */}
                <Field
                  InputProps={{ disableUnderline: true }}
                  sx={inputstyle}
                  variant="filled"
                  name="email"
                  type="email"
                  label={translations["widget.email"]}
                  as={TextField}
                  fullWidth
                  margin="normal"
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="email" component="div" />
                    </div>
                  }
                />
                {/* EMAIL END */}

                {/* PHONE NUMBER */}
                <Field
                  InputProps={{ disableUnderline: true }}
                  sx={inputstyle}
                  variant="filled"
                  name="phonenumber"
                  type="text"
                  label={translations["widget.contactnumber"]}
                  as={TextField}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    pattern: "\\d*",
                    inputMode: "numeric",
                  }}
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="phonenumber" component="div" />
                    </div>
                  }
                />
                {/* PHONE NUMBER END */}

                {/* INSURANCE */}
                <Field
                  InputProps={{ disableUnderline: true }}
                  sx={inputstyle}
                  variant="filled"
                  name="insurance"
                  type="text"
                  label={translations["widget.insurance"]}
                  as={TextField}
                  fullWidth
                  margin="normal"
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="insurance" component="div" />
                    </div>
                  }
                  select
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
                </Field>
                {/* INSURANCE END */}

                {/* LOCATION */}
                <Field
                  InputProps={{ disableUnderline: true }}
                  sx={inputstyle}
                  variant="filled"
                  name="location"
                  type="text"
                  label={translations["widget.location"]}
                  as={TextField}
                  fullWidth
                  margin="normal"
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="location" component="div" />
                    </div>
                  }
                />
                {/* LOCATION END */}

                {/* SERVICES */}
                <Field
                  InputProps={{ disableUnderline: true }}
                  sx={inputstyle}
                  variant="filled"
                  name="services"
                  type="text"
                  label={translations["widget.service"]}
                  as={TextField}
                  fullWidth
                  multiline
                  rows={2}
                  margin="normal"
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="services" component="div" />
                    </div>
                  }
                />
                {/* SERVICES END */}

                <Field type="hidden" name="subject" value={subject} />
                <Field type="hidden" name="message" value={message} />

                {/* <Box
                  sx={{
                    fontSize: "1.1rem",
                    letterSpacing: "0.02em",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    textAlign: "left",
                    lineHeight: 1.1,
                  }}
                >
             
                  {translations["widget.describe"]}
                </Box> */}
                <Button
                  sx={{
                    mt: 2,
                    fontFamily: "Montserrat",
                    color: "var(--white)",
                    fontSize: "1.8rem",
                    fontWeight: "800",

                    textTransform: "none",
                    borderRadius: "1.2rem",
                    padding: "1rem 2rem",

                    background: "var(--secondary-color)",
                    "&:hover": {
                      background: "#9dd9f4",
                      color: "var(--primary-color)",
                    },
                    width: "100%",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {translations["widget.submit"]}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {submitted && (
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            right: 16,
            backgroundColor: "#fff",
            textAlign: "center",
            padding: 2,
            borderRadius: 4,
            boxShadow: 3,
            fontSize: "1.8rem",
            fontWeight: "800",
            color: "#53d769",
            width: {
              xs: "92vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "20vw",
            },
            zIndex: 999,
          }}
        >
          <p>{translations["widget.thankyou"]}</p>
          <p>{translations["widget.thankyou2"]}</p>
        </Box>
      )}
    </div>
  );
}

export default Widget;
