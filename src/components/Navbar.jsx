import React, { useContext, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";

import LanguageContext from "../contexts/LanguageContext"; // Import Language Context
import enTranslations from "../locales/en.json";
import czTranslations from "../locales/cz.json";
import ruTranslations from "../locales/ru.json";
import {
  elementScrollIntoView,
  elementScrollIntoViewPolyfill,
} from "seamless-scroll-polyfill";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [avatarSrc, setAvatarSrc] = React.useState(null);

  const appBarRef = useRef(null); // Reference to the AppBar component

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const { language, setLanguage } = useContext(LanguageContext); // Access Language Context

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const translations =
    language === "cz"
      ? czTranslations
      : language === "ru"
      ? ruTranslations
      : enTranslations;

  const pages = [
    translations["navbar.home"],
    translations["navbar.why"],
    translations["navbar.services"],
    translations["navbar.contact"],
  ];

  // console.log(pages);
  const handleScroll = (page) => {
    const targetIds = {
      [translations["navbar.home"]]: "home",
      [translations["navbar.why"]]: "why",
      [translations["navbar.contact"]]: "contact",
      [translations["navbar.services"]]: "revolution",
    };

    const targetId = targetIds[page] || page.toLowerCase().replace(/ /g, "-");
    const element = document.getElementById(targetId);

    if (element) {
      if (
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        element.scrollIntoViewIfNeeded
      ) {
        // Safari does not support scrollIntoView, thus using a third-party API
        elementScrollIntoView(element, {
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else {
        // For other devices or if scrollIntoViewIfNeeded is not available, use regular scrollIntoView with smooth behavior
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      handleCloseNavMenu(); // Close mobile navigation
    }
  };
  useEffect(() => {
    switch (language) {
      case "cz":
        setAvatarSrc(
          "https://res.cloudinary.com/dulasau/image/upload/v1708309655/cz_tvyswn.png"
        );
        break;
      case "ru":
        setAvatarSrc(
          "https://res.cloudinary.com/dulasau/image/upload/v1708309655/ru_yimglg.png"
        );
        break;
      default:
        setAvatarSrc(
          "https://res.cloudinary.com/dulasau/image/upload/v1708309482/en_wioswp.png"
        );
    }
  }, [language]);

  // Handle Language Change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    // console.log(newLanguage);
    if (newLanguage === "en") {
      setAvatarSrc(
        "https://res.cloudinary.com/dulasau/image/upload/v1708309482/en_wioswp.png"
      );
    } else if (newLanguage === "cz") {
      setAvatarSrc(
        "https://res.cloudinary.com/dulasau/image/upload/v1708309655/cz_tvyswn.png"
      );
    } else if (newLanguage === "ru") {
      setAvatarSrc(
        "https://res.cloudinary.com/dulasau/image/upload/v1708309655/ru_yimglg.png"
      );
    }
    handleCloseUserMenu();
  };

  // Function to handle resize events and adjust the app bar position
  const handleResize = () => {
    if (appBarRef.current) {
      appBarRef.current.style.bottom = `${
        window.innerHeight - appBarRef.current.offsetTop
      }px`;
    }
  };

  // Attach resize event listener when component mounts
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle initial positioning
  useEffect(() => {
    handleResize();
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // console.log(translations);
  return (
    <>
      <AppBar
        ref={appBarRef}
        sx={{
          background: "var(--white)",
          // background: "lightyellow",
          width: "100%",
          zIndex: 900,
          position: "sticky",
        }}
      >
        <Container sx={{}}>
          <Toolbar disableGutters>
            {/* DESKTOP LOGO */}
            <Box
              component="a"
              href="" //TODO
              sx={{
                flex: "0 0 30%",
                justifyContent: "flex-start",
                alignItems: "center",
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707398536/GOMEDCZ/July_Gomed_color_kzhhzr.png"
                alt="Gomed logo"
                style={{ maxWidth: "109px" }}
              />
            </Box>
            {/* DESKTOP LOGO END*/}

            {/* MOBILE MENU */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="menu button"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon
                  style={{ color: "var(--black)", fontSize: "2.2rem" }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleScroll(page)}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "var(--black)",
                        fontSize: "2rem",
                        fontFamily: "Montserrat",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* MOBILE MENU END */}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="" //TODO
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src="https://res.cloudinary.com/dulasau/image/upload/v1707398536/GOMEDCZ/July_Gomed_color_kzhhzr.png"
                alt="Gomed logo"
                style={{ maxWidth: "109px" }}
              />
            </Typography>

            {/* DESKTOP MENU */}
            <Box
              sx={{
                flexGrow: 1,

                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleScroll(page)}
                  sx={{
                    my: 2,
                    fontSize: "1.8rem",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    color: "var(--black)",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {/* DESKTOP MENU END */}
            {/* Language Selector */}
            <Box sx={{ flexGrow: 0, marginLeft: "4rem" }}>
              <Tooltip title="Language">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="language" src={avatarSrc} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  <Button onClick={() => handleLanguageChange("en")}>EN</Button>
                  <Button onClick={() => handleLanguageChange("cz")}>CZ</Button>
                  <Button onClick={() => handleLanguageChange("ru")}>RU</Button>
                </Box>
              </Menu>
            </Box>
            {/* Language Selector End */}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
