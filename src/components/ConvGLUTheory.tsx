import { Stack, Text, Box } from "@mantine/core";

const WHY_ITEMS = [
  {
    title: "Spatial awareness per FFN block",
    body: "The 3×3 kernel mixes information from the 8 immediate spatial neighbours at every depth, injecting locality that attention alone cannot provide, at O(1) cost per token.",
  },
  {
    title: "Feature collapse prevention",
    body: "The gating bottleneck forces tokens to remain spatially distinct. Repeated attention + MLP stacks tend to converge to low-rank attractors; the convolutional gate breaks that symmetry.",
  },
  {
    title: "Drop-in FFN replacement",
    body: "ConvGLU needs no changes to the attention mechanism. The depth-wise conv is grouped (parameter-efficient) and adds negligible FLOPs versus a standard two-layer MLP.",
  },
];

export function ConvGLUTheory() {
  return (
    <Stack gap="lg">
      <Text size="md" style={{ lineHeight: 1.9 }}>
        Standard transformer FFNs are{" "}
        <Text span c="white" fw={500}>
          spatially blind
        </Text>
        : each token is processed independently through a two-layer MLP, with no
        awareness of which tokens sit nearby in the image. After many such
        layers, features across the sequence begin to collapse, converging
        toward a low-rank subspace, a pathology known as{" "}
        <Text span c="white" fw={500}>
          feature collapse
        </Text>
        .
      </Text>

      {/* Mechanism */}
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
          THE CONVGLU MECHANISM
        </Text>
        <Text size="md" style={{ lineHeight: 1.8 }} mb={12}>
          TransNeXt replaces the vanilla FFN with a{" "}
          <Text span c="white" fw={500}>
            Convolutional Gated Linear Unit
          </Text>
          . The input is projected into two parallel streams. One stream is
          passed through a{" "}
          <Text span c="white" fw={500}>
            3×3 depth-wise convolution
          </Text>
          , giving it local spatial context. The two streams are then multiplied
          element-wise, so the convolved branch gates which spatial patterns
          survive into the output.
        </Text>

        <Box
          px="sm"
          py={10}
          style={{ background: "rgba(0,0,0,0.4)", borderRadius: 6 }}
        >
          <Text size="sm" style={{ fontFamily: "monospace", lineHeight: 2 }}>
            <Text span c="white">
              y
            </Text>
            {" = W_down( "}
            <Text span style={{ color: "#e8a020" }} fw={700}>
              DW₃ₓ₃
            </Text>
            {"(W_up1(x))  "}
            <Text span c="white" fw={800}>
              ⊙
            </Text>
            {"  W_up2(x) )"}
          </Text>
          <Text size="xs" style={{ color: "#a0a0a0", marginTop: 4 }}>
            ⊙ = element-wise (Hadamard) product · DW₃ₓ₃ = grouped depth-wise
            conv
          </Text>
        </Box>
      </Box>

      {/* Why it works */}
      <Box
        p="md"
        style={{
          background: "rgba(34, 197, 94, 0.05)",
          border: "1px solid rgba(34, 197, 94, 0.2)",
          borderRadius: 8,
        }}
      >
        <Text
          size="sm"
          fw={700}
          mb={10}
          style={{ letterSpacing: "0.1em", color: "#22c55e" }}
        >
          WHY THIS WORKS
        </Text>
        <Stack gap={12}>
          {WHY_ITEMS.map(({ title, body }) => (
            <Box
              key={title}
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <Text
                size="sm"
                fw={700}
                style={{ color: "#22c55e", flexShrink: 0, paddingTop: 2 }}
              >
                →
              </Text>
              <Box>
                <Text size="sm" fw={600} mb={2} style={{ color: "#c0c0c0" }}>
                  {title}
                </Text>
                <Text size="sm" style={{ lineHeight: 1.75 }}>
                  {body}
                </Text>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Text
        size="sm"
        style={{ lineHeight: 1.8, fontStyle: "italic", color: "#707070" }}
      >
        → Press Play in the simulation to watch the gate and value streams
        split, process spatially, and recombine.
      </Text>
    </Stack>
  );
}
