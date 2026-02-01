import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Box,
  Image,
  Alert,
} from "@mantine/core";
import { Info } from "lucide-react";

import "./App.css";
import percept_logo from "./assets/react.svg";
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

      {/* Header */}
      <Box
        component="header"
        style={{
          borderBottom: "1px solid var(--mantine-color-dark-4)",
          padding: "1rem 0",
        }}
      >
        <Container size="lg">
          <Stack gap="md">
            {/* Mobile: Stacked vertically, centered */}
            <Box hiddenFrom="sm">
              <Stack gap="md" align="center">
                <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image
                    src={percept_logo}
                    alt="Percept It!"
                    style={{ width: 28, height: 28 }}
                  />
                  <Title
                    order={1}
                    fw={300}
                    fz="h3"
                    className="app-title"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Percept It!
                  </Title>
                </Box>

                {/* Social Icons - Mobile */}
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Text size="xs" c="dimmed">
                    find Ahmed here 👉
                  </Text>
                  <Box style={{ display: "flex", gap: 12 }}>
                    <a
                      href="https://github.com/0xahmedk"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      style={{ color: "inherit" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0012 .297z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/0xahmedkhan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      style={{ color: "inherit" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54V24H.22zM8.98 8h4.36v2.2h.06c.61-1.16 2.1-2.4 4.33-2.4 4.63 0 5.48 3.05 5.48 7.02V24h-4.54v-7.07c0-1.69-.03-3.86-2.36-3.86-2.37 0-2.73 1.85-2.73 3.75V24H8.98V8z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.instagram.com/0xahmedk"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      style={{ color: "inherit" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm8 1.5a1.25 1.25 0 11-.001 2.501A1.25 1.25 0 0115 5.5zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
                      </svg>
                    </a>

                    <a
                      href="https://medium.com/@0xahmedkhan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Medium"
                      style={{ color: "inherit" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M2 6.5v11L8 12l-6-5.5zM10 6.5l6.5 11H22V6.5H10zM10 6.5h12" />
                      </svg>
                    </a>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* Desktop/Tablet: space-between layout */}
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              visibleFrom="sm"
            >
              <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image
                  src={percept_logo}
                  alt="Percept It! Logo"
                  style={{ width: 28, height: 28 }}
                />
                <Title
                  order={1}
                  fw={300}
                  fz="h1"
                  className="app-title"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Percept It!
                </Title>
              </Box>

              {/* Social Icons - Desktop/Tablet */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text size="xs" c="dimmed">
                  find Ahmed here 👉
                </Text>
                <Box style={{ display: "flex", gap: 12 }}>
                  <a
                    href="https://github.com/0xahmedk"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{ color: "inherit" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 20, height: 20 }}
                    >
                      <path d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0012 .297z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/0xahmedkhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ color: "inherit" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 20, height: 20 }}
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54V24H.22zM8.98 8h4.36v2.2h.06c.61-1.16 2.1-2.4 4.33-2.4 4.63 0 5.48 3.05 5.48 7.02V24h-4.54v-7.07c0-1.69-.03-3.86-2.36-3.86-2.37 0-2.73 1.85-2.73 3.75V24H8.98V8z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/0xahmedk"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ color: "inherit" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 20, height: 20 }}
                    >
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm8 1.5a1.25 1.25 0 11-.001 2.501A1.25 1.25 0 0115 5.5zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
                    </svg>
                  </a>

                  <a
                    href="https://medium.com/@0xahmedkhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Medium"
                    style={{ color: "inherit" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 20, height: 20 }}
                    >
                      <path d="M2 6.5v11L8 12l-6-5.5zM10 6.5l6.5 11H22V6.5H10zM10 6.5h12" />
                    </svg>
                  </a>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

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
          playground={<BeachDaySandbox />}
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
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        style={{
          borderTop: "1px solid var(--mantine-color-dark-4)",
          padding: "1.5rem 0",
        }}
      >
        <Container size="lg">
          <Stack gap="xs" align="center">
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
          </Stack>
        </Container>
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </Box>
  );
}

export default App;
