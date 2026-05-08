import { useState } from "react";
import { Container, Text, Stack, Box, Alert, Paper } from "@mantine/core";
import { Info } from "lucide-react";

import "./App.css";
import { ProgressNavigation } from "./components/ProgressNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { IntroductionSection } from "./components/IntroductionSection";
import { Section } from "./components/Section";
import { ViewCounter } from "./commons/ViewCounter";
import { StandardViTTheory } from "./components/StandardViTTheory";
import { GridViTPlayground } from "./components/GridViTPlayground";
import { AggregatedAttentionTheory } from "./components/AggregatedAttentionTheory";
import { FovealLensPlayground } from "./components/FovealLensPlayground";
import { ConvGLUTheory } from "./components/ConvGLUTheory";
import { ConvGLUPlayground } from "./components/ConvGLUPlayground";
import ViewAnalytics from "./commons/ViewAnalytics";

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

        {/* Section 0: The Evolution of Vision */}
        <Section
          id="section-0"
          stage="Section 0"
          title="The Evolution of Vision"
          subtitle="From uniform grid attention to biologically inspired foveal awareness"
          theory={<StandardViTTheory />}
          playground={<GridViTPlayground />}
        />

        {/* Section 2: The TransNeXt Breakthrough */}
        <Section
          id="section-2"
          stage="Section 2"
          title="The TransNeXt Breakthrough"
          subtitle="Aggregated Attention, foveal-inspired query-key interaction with a fixed peripheral pool"
          theory={<AggregatedAttentionTheory />}
          playground={<FovealLensPlayground />}
        />

        {/* Section 3: ConvGLU */}
        <Section
          id="section-3"
          stage="Section 3"
          title="ConvGLU: The Spatial Modeling Gate"
          subtitle="Replacing position-blind MLPs with spatially-aware gated convolution"
          theory={<ConvGLUTheory />}
          playground={<ConvGLUPlayground />}
        />

        {/* Closing Thoughts Section */}
        <Box style={{ padding: "4rem 0", borderTop: "1px solid #2a2a2e" }}>
          <Container size="md">
            <Stack gap="xl">
              {/* Title */}
              <Box>
                <Text
                  size="sm"
                  fw={600}
                  tt="uppercase"
                  mb="xs"
                  style={{ color: "#e8a020", letterSpacing: "0.08em" }}
                >
                  Closing Thoughts
                </Text>
                <Text size="xl" fw={700} c="white" mb="xs">
                  What TransNeXt Gets Right, and What Remains Open
                </Text>
              </Box>

              <Paper
                p="xl"
                radius="lg"
                style={{
                  backgroundColor: "#141417",
                  border: "1px solid #2a2a2e",
                }}
              >
                <Stack gap="lg">
                  <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
                    TransNeXt makes a compelling argument: the uniform-attention
                    paradigm of standard ViTs is a design choice, not a
                    necessity. By borrowing two ideas from biology and signal
                    processing, a{" "}
                    <Text span c="white" fw={500}>
                      foveal attention field
                    </Text>{" "}
                    that prioritises nearby tokens, and a{" "}
                    <Text span c="white" fw={500}>
                      spatially-aware gating function
                    </Text>{" "}
                    that replaces position-blind MLPs, the architecture achieves
                    sub-quadratic complexity without sacrificing the global
                    receptive field that makes transformers powerful. The fixed
                    7×7 peripheral pool is particularly elegant: it turns an
                    O(N) problem into an O(1) constant, meaning efficiency gains
                    compound as image resolution grows.
                  </Text>

                  <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
                    In practice, TransNeXt reported strong results on ImageNet
                    classification and ADE20K segmentation at the time of its
                    CVPR 2024 publication, with accuracy competitive with much
                    larger models. The spatial robustness experiments, where
                    TransNeXt maintained accuracy under mild image shifts that
                    degraded standard ViTs, suggest the architectural inductive
                    biases are doing genuine work, not just adding parameters.
                  </Text>
                </Stack>
              </Paper>

              {/* Limitations */}
              <Paper
                p="xl"
                radius="lg"
                style={{
                  backgroundColor: "#141417",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <Text
                  size="sm"
                  fw={700}
                  mb="md"
                  style={{ letterSpacing: "0.1em", color: "#ef4444" }}
                >
                  LIMITATIONS & OPEN QUESTIONS
                </Text>
                <Stack gap={14}>
                  {[
                    {
                      title: "Fixed foveal radius and pool size",
                      body: "The foveal radius K and the 7×7 peripheral grid are hand-tuned hyperparameters. Whether these are truly optimal, or whether a learned, content-adaptive fovea would outperform them, is an open question the paper does not fully address.",
                    },
                    {
                      title: "Scope limited to dense prediction tasks",
                      body: 'TransNeXt was evaluated primarily on image classification and segmentation. Its behaviour on video, multi-modal, or language-conditioned vision tasks is not established. The foveal metaphor may not transfer cleanly when the "query" is not a spatial patch.',
                    },
                    {
                      title: "ConvGLU interaction not fully ablated",
                      body: "Aggregated Attention and ConvGLU are presented together, making it difficult to disentangle their individual contributions. The ablations in the paper show each component helps, but their interaction, whether they are complementary or partially redundant, is not deeply analysed.",
                    },
                    {
                      title: "Simulation simplifications in this explainer",
                      body: "The interactive demos here discretise the foveal region with a circular threshold and use a uniform 3×3 pool for visualisation. The actual TransNeXt implementation uses window-partitioned attention with learnable relative position biases, the real mechanism is richer than what can be shown in a 2D canvas demo.",
                    },
                  ].map(({ title, body }) => (
                    <Box
                      key={title}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        size="sm"
                        fw={700}
                        style={{
                          color: "#ef4444",
                          flexShrink: 0,
                          paddingTop: 3,
                        }}
                      >
                        —
                      </Text>
                      <Box>
                        <Text
                          size="sm"
                          fw={600}
                          mb={3}
                          style={{ color: "#c0c0c0" }}
                        >
                          {title}
                        </Text>
                        <Text
                          size="sm"
                          style={{ color: "#a0a0a0", lineHeight: 1.75 }}
                        >
                          {body}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              <Text
                size="md"
                style={{
                  lineHeight: 1.9,
                  color: "#707070",
                  fontStyle: "italic",
                }}
              >
                The broader lesson from TransNeXt is that Vision Transformers
                still have room to absorb structure from the domain they operate
                in. Global, uniform attention is a reasonable default, but
                explicitly modelling the asymmetry between near and far context,
                and giving the FFN a sense of spatial neighbourhood, appears to
                be worth the complexity. Whether future architectures take this
                further, perhaps with fully learned, dynamic foveal regions,
                remains an interesting direction.
              </Text>
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        style={{
          borderTop: "1px solid #2a2a2e",
          padding: "2.5rem 0",
        }}
      >
        <Container size="lg">
          <Stack gap="md" align="center">
            {/* Author */}
            <Box style={{ textAlign: "center" }}>
              <a
                href="https://0xahmedk.github.io/me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 14px",
                  background: "rgba(232, 160, 32, 0.08)",
                  border: "1px solid rgba(232, 160, 32, 0.3)",
                  borderRadius: 20,
                  color: "#e8a020",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(232, 160, 32, 0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(232, 160, 32, 0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(232, 160, 32, 0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(232, 160, 32, 0.3)";
                }}
              >
                More by this author ↗
              </a>
            </Box>

            <Box style={{ width: 1, height: 24, background: "#2a2a2e" }} />

            <ViewCounter />
            <ViewAnalytics />
          </Stack>
        </Container>
      </Box>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </Box>
  );
}

export default App;
