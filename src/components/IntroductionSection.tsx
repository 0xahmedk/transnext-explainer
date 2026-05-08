import { Box, Container, Text, Stack, Title, Image } from "@mantine/core";
import { motion } from "framer-motion";
import logo from "../assets/transnext_icon.png";

export function IntroductionSection() {
  return (
    <Box
      component="section"
      py={120}
      style={{
        borderBottom: "1px solid #2a2a2e",
        backgroundColor: "#0a0a0c",
      }}
    >
      <Container size="md">
        <Stack gap="xl" align="center">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          ></motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Image
              src={logo}
              alt="TransNeXt logo"
              style={{ width: 96, height: 96, objectFit: "contain" }}
            />
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ textAlign: "center" }}
          >
            <Title
              order={1}
              ta="center"
              style={{
                fontSize: "clamp(28px, 4.8vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#ffffff",
              }}
            >
              TransNeXt: Mimicking the Human Eye
              <br />
              with Foveal Vision
            </Title>
          </motion.div>

          {/* Sub-description */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <Text
              size="lg"
              ta="center"
              maw={680}
              style={{ lineHeight: 1.85, color: "#a0a0a0" }}
            >
              A deep dive into CVPR 2024's breakthrough in Vision Transformers.
              This post explores the transition from rigid grid-based attention
              to biologically inspired{" "}
              <Text span c="white" fw={500}>
                Aggregated Attention
              </Text>{" "}
              and imrproved FFN{" "}
              <Text span c="white" fw={500}>
                Convolutional GLU
              </Text>
              .
            </Text>
          </motion.div>

          {/* Byline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            <Text size="md" ta="center" style={{ color: "#707070" }}>
              explained by{" "}
              <a
                href="https://0xahmedk.github.io/me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#e8a020",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ahmed Khan
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#e8a020",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ayesha Tahir
              </a>{" "}
              &{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#e8a020",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Shanzae Khan
              </a>
            </Text>
            <Text
              mt={35}
              style={{
                opacity: 0.7,
                textAlign: "center",
                fontSize: 14,
                fontStyle: "italic",
              }}
            >
              Scroll down to begin.
            </Text>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
