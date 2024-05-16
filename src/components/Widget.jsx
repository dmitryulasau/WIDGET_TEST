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

function Widget() {
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
  const appointmentTemplateId = import.meta.env.VITE_APPOINTMENT_TEMPLATE_ID;
  const userId = import.meta.env.VITE_USER_ID;

  const sendEmail = (formData) => {
    console.log(formData);
    if (form.current) {
      emailjs
        .sendForm(serviceId, appointmentTemplateId, form.current, userId)
        .then(
          (result) => {
            console.log("Email successfully sent!", result.text);
            setSubmitted(true);
          },
          (error) => {
            console.error("Email sending failed:", error.text);
          }
        );
    } else {
      console.error("Form element not found or not mounted yet.");
    }
  };

  // VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(translations["widget.error.firstname"]),
    lastname: Yup.string().required(translations["widget.error.lastname"]),
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
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
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
      borderRadius: 4,
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
      fontSize: "1rem",
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
  };

  useEffect(() => {
    setFormData({
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
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
            firstname: "",
            lastname: "",
            phonenumber: "",
            email: "",
            location: "",
            services: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm, ...other }) => {
            // Pass the event object as the third argument
            sendEmail(values, other);
            // Here you can handle form submission logic
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
                  backgroundColor: "#fff",
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
                    textAlign: "center",
                    fontSize: "1.3rem",
                    letterSpacing: "0.02em",
                    marginBottom: "0.8rem",
                  }}
                >
                  <h3>{translations["widget.heading"]}</h3>
                  <br />
                  {translations["widget.subheading"]}
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* FIRST NAME */}
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
                    {/* FIRST NAME END */}
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
                </Grid>

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
                  rows={3}
                  margin="normal"
                  helperText={
                    <div style={{ color: "var(--error-color)" }}>
                      <ErrorMessage name="services" component="div" />
                    </div>
                  }
                />
                {/* SERVICES END */}

                <Box
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
                  {/* DESCRIBE */}
                  {translations["widget.describe"]}
                </Box>
                <Button
                  sx={{
                    mt: 2,
                    fontFamily: "Montserrat",
                    color: "var(--white)",
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "1.2rem",
                    padding: "0.3rem 4rem",

                    background: "#53d769",
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
