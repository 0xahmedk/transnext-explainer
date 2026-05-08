import { Stack, Text, Box } from "@mantine/core";

const STEPS = [
  "Split image into N non-overlapping patches (e.g. 16×16 px each)",
  "Project each patch into a D-dimensional embedding vector",
  "Prepend a [CLS] token and add learnable positional encodings",
  "Feed the full sequence through a Transformer encoder, every patch attends to every other patch",
];

export function StandardViTTheory() {
  return (
    <Stack gap="lg">
      <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
        The original Vision Transformer (ViT) introduced the{" "}
        <Text span c="white" fw={500}>
          "Image as 16×16 Words"
        </Text>{" "}
        paradigm: divide an image into a fixed grid of non-overlapping patches,
        treat each patch as a token, and pass the sequence through a standard
        Transformer encoder.
      </Text>

      {/* Steps */}
      <Box
        p="md"
        style={{
          background: "rgba(232, 160, 32, 0.06)",
          border: "1px solid rgba(232, 160, 32, 0.2)",
          borderRadius: 8,
        }}
      >
        <Text
          size="sm"
          fw={700}
          mb={10}
          style={{ letterSpacing: "0.1em", color: "#e8a020" }}
        >
          HOW IT WORKS
        </Text>
        <Stack gap={10}>
          {STEPS.map((step, i) => (
            <Box
              key={i}
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <Text
                size="sm"
                fw={700}
                style={{ flexShrink: 0, paddingTop: 1, color: "#e8a020" }}
              >
                {i + 1}.
              </Text>
              <Text size="sm" style={{ lineHeight: 1.75, color: "#a0a0a0" }}>
                {step}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>

      <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
        Step 4 is where the cost compounds. Self-attention computes pairwise
        relationships between all N tokens, requiring an{" "}
        <Text
          span
          fw={700}
          style={{
            background: "rgba(232, 160, 32, 0.12)",
            color: "#e8a020",
            padding: "1px 7px",
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          N × N
        </Text>{" "}
        attention matrix, a complexity of{" "}
        <Text
          span
          fw={700}
          style={{
            background: "rgba(232, 160, 32, 0.12)",
            color: "#e8a020",
            padding: "1px 7px",
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          O(N²)
        </Text>
        . For a 224×224 image that's 196 tokens and 38,416 pairs. Scale to
        higher resolution and the cost becomes prohibitive.
      </Text>

      {/* Core flaw */}
      <Box
        p="md"
        style={{
          background: "rgba(239, 68, 68, 0.05)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          borderRadius: 8,
        }}
      >
        <Text
          size="sm"
          fw={700}
          mb={6}
          style={{ letterSpacing: "0.1em", color: "#ef4444" }}
        >
          THE FUNDAMENTAL FLAW
        </Text>
        <Text size="md" style={{ lineHeight: 1.75, color: "#a0a0a0" }}>
          Standard ViTs treat{" "}
          <Text span style={{ color: "#ef4444" }} fw={600}>
            all patches as equally important
          </Text>
          . The background sky receives the same computational budget as the
          subject's face. There is no built-in concept of visual priority, no
          "fovea." This uniform attention is the inefficiency TransNeXt was
          designed to eliminate.
        </Text>
      </Box>

      <Text
        size="sm"
        style={{ lineHeight: 1.8, fontStyle: "italic", color: "#707070" }}
      >
        → Hover over any patch in the simulation to see how many connections a
        single patch must maintain under global attention.
      </Text>
    </Stack>
  );
}
