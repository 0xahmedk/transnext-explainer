import { useState } from "react";
import {
  Container,
  Text,
  Stack,
  Box,
  Image,
  Alert,
  Paper,
} from "@mantine/core";
import { Info } from "lucide-react";

import "./App.css";
import percept_logo from "./assets/percept_logo.png";
import { ProgressNavigation } from "./components/ProgressNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { IntroductionSection } from "./components/IntroductionSection";
import { Section } from "./components/Section";
import {
  LogicGatesTheory,
  WeightsBiasTheory,
  MultiLayerTheory,
  SandboxTheory,
} from "./content/TheoryContent";
import { LogicGatePlayground } from "./components/playground/AndGatePlayground";
import { CatDetectorPlayground } from "./components/playground/CatDetectorPlayground";
import { BeachDaySandbox } from "./components/playground/BeachDaySandbox";
import { PerceptronPlayground } from "./components/playground";
import { ViewCounter } from "./commons/ViewCounter";

function App() {
  // Mobile warning state
  const [showMobileWarning, setShowMobileWarning] = useState(true);

  return (
    <Box
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Mobile Warning Banner - Only visible on mobile */}
      {showMobileWarning && (
        <Alert
          icon={<Info size={16} />}
          title="Desktop Recommended"
          color="blue"
          withCloseButton
          onClose={() => setShowMobileWarning(false)}
          hiddenFrom="sm"
          styles={{
            root: { borderRadius: 0 },
          }}
        >
          For the best educational experience, please use the desktop version.
        </Alert>
      )}

      {/* Main Section */}
      <Box component="main" style={{ flex: 1 }}>
        {/* Progress Navigation (Desktop) */}
        <ProgressNavigation />

        {/* Introduction */}
        <IntroductionSection />

        {/* Stage 1: Logic Gates */}
        <Section
          id="logic-gates"
          stage="Stage 1"
          title="The Birth of Logic"
          subtitle="From binary decisions to intelligent behavior"
          theory={<LogicGatesTheory />}
          playground={<LogicGatePlayground />}
        />

        {/* Stage 2: Weights & Bias */}
        <Section
          id="weights-bias"
          stage="Stage 2"
          title="The Tuning Knobs"
          subtitle="Understanding how neurons learn to decide"
          theory={<WeightsBiasTheory />}
          playground={<PerceptronPlayground />}
        />

        {/* Stage 3: Multi-Layer */}
        <Section
          id="multi-layer"
          stage="Stage 3"
          title="The Power of Layers"
          subtitle="When neurons work together, magic happens"
          theory={<MultiLayerTheory />}
          playground={<CatDetectorPlayground />}
          layout="vertical"
        />

        {/* Stage 4: Sandbox */}
        <Section
          id="sandbox"
          stage="Stage 4"
          title="The Perceptron Lab"
          subtitle="Build your own neural network from scratch"
          theory={<SandboxTheory />}
          playground={<BeachDaySandbox />}
          layout="vertical"
        />

        {/* Closing Thoughts Section */}
        <Box
          style={{
            padding: "4rem 0",
            borderTop: "1px solid var(--mantine-color-dark-4)",
          }}
        >
          <Container size="md">
            <Paper
              p="xl"
              radius="lg"
              style={{
                backgroundColor: "#1a1b1e",
                border: "1px solid #373a40",
              }}
            >
              <Stack gap="lg">
                <Text c="dimmed" size="md" style={{ lineHeight: 1.8 }}>
                  What you just explored isn't just a historical curiosity, it's
                  the foundation of the AI revolution we're living through right
                  now. The simple perceptron you played with, sparked an idea
                  that would eventually reshape our world.
                </Text>

                <Text c="dimmed" size="md" style={{ lineHeight: 1.8 }}>
                  Every AI breakthrough you hear about, ChatGPT, image
                  generators, self-driving cars, medical diagnosis systems, they
                  all build on this same fundamental principle: neurons that
                  learn by adjusting weights and biases. Today's neural networks
                  are just billions of these neurons working together, but the
                  core concept remains unchanged.
                </Text>

                <Text c="dimmed" size="md" style={{ lineHeight: 1.8 }}>
                  By understanding perceptrons, you've grasped the beating heart
                  of artificial intelligence. You now know that AI isn't magic,
                  it's math, activation functions, and clever arrangements of
                  simple units that can approximate almost any pattern. That's
                  both humbling and empowering.
                </Text>

                <Text
                  c="dimmed"
                  fw={500}
                  ta="center"
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  The future of AI is being written right now. And you've just
                  learned its alphabet.
                </Text>
              </Stack>
            </Paper>
          </Container>
        </Box>

        {/* Buy Me a Coffee Section */}
        <Box
          style={{
            padding: "4rem 0",
            textAlign: "center",
            borderTop: "1px solid var(--mantine-color-dark-4)",
          }}
        >
          <Container size="sm">
            <Stack gap="xl" align="center">
              <Stack gap="md" align="center">
                <Text size="md" c="dimmed" maw={500} ta="center">
                  If this interactive journey through neural networks sparked
                  some connections in your brain, consider fueling mine with
                  some caffeine
                </Text>
              </Stack>

              <a
                href="https://buymeacoffee.com/ahmedpro"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Box
                  component="button"
                  style={{
                    padding: "1rem 1rem",
                    backgroundColor: "#FFDD00",
                    border: "none",
                    borderRadius: "12px",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 14px rgba(255, 221, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(255, 221, 0, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(255, 221, 0, 0.4)";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z" />
                  </svg>
                  Buy Ahmed some activation
                </Box>
              </a>
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        style={{
          borderTop: "1px solid var(--mantine-color-dark-4)",
          padding: "2rem 0",
        }}
      >
        <Container size="lg">
          <Stack gap="lg" align="center">
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Image
                src={percept_logo}
                alt="PERCEPT Logo"
                style={{ width: 20, height: 20 }}
              />
              <Text size="sm" c="dimmed">
                Built with ❤️ by Ahmed
              </Text>
            </Box>

            {/* Social Icons */}
            <Stack gap="sm" align="center">
              <Text size="xs" c="dimmed">
                find Ahmed here 👇
              </Text>
              <Box
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://github.com/0xahmedk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  style={{ color: "inherit", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0012 .297z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/0xahmedkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: "inherit", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54V24H.22zM8.98 8h4.36v2.2h.06c.61-1.16 2.1-2.4 4.33-2.4 4.63 0 5.48 3.05 5.48 7.02V24h-4.54v-7.07c0-1.69-.03-3.86-2.36-3.86-2.37 0-2.73 1.85-2.73 3.75V24H8.98V8z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/0xahmedk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: "inherit", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm8 1.5a1.25 1.25 0 11-.001 2.501A1.25 1.25 0 0115 5.5zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
                  </svg>
                </a>

                <a
                  href="https://medium.com/@0xahmedkhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                  style={{ color: "inherit", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6.5v11L8 12l-6-5.5zM10 6.5l6.5 11H22V6.5H10zM10 6.5h12" />
                  </svg>
                </a>
              </Box>
            </Stack>

            <ViewCounter />
          </Stack>
        </Container>
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </Box>
  );
}

export default App;
