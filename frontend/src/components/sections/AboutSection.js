import React from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "../../assets/access.png";
import "../../styles.css";

const AboutSection = () => {
  return (
    <div id="about">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
          justifyContent: { lg: "space-between", md: "center" },
          alignItems: "center",
          height: "100vh",
          padding: "10rem",
          paddingX: { lg: "5rem", md: "4rem", xs: "1rem" },
          fontFamily: "Inter",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            textAlign: "left",
            backgroundColor: "#3C404A",
            borderRadius: "0 100px 0 100px ",
            color: "#F1F0F0",
            width: { lg: "40%", md: "60%", sm: "85%", xs: "85%" },
            height: "30rem",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Playfair Display",
                fontSize: "38px",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              About us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                paddingRight: { lg: "2rem", md: "1rem", sm: "1rem" },
                lineHeight: "normal",
                letterSpacing: "normal",
                fontSize: { lg: "18px", md: "16px", sm: "16px", xs: "14px" },
              }}
            >
              <p>
                We are with You since{" "}
                <strong style={{ color: "#EC6D62" }}>2005</strong> and still
                priding ourselves on ensuring professionalism and
                confidentiality in every case we handle. We work from Monday to
                Friday from 8 am to 8 pm. If You want to contact us write an
                e-mail to mrDetective@secret.com or call us at +48 881234233.
              </p>{" "}
              <p>
                Let us be Your reliable partner in uncovering the information
                You need —— Secret, where discretion meets results.
              </p>
            </Typography>
          </Container>
        </Container>
        <Box
          sx={{
            display: { md: "flex", sm: "none", xs: "none" },
            marginLeft: "3rem",
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default AboutSection;
