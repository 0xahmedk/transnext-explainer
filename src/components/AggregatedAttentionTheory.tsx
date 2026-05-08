import { Stack, Text, Box, Group } from "@mantine/core";

const SCALE_ROWS: [string, string, string][] = [
  ["224×224  (196 tokens)", "~30 foveal + 49 pool = 79", "~60% ↓"],
  ["512×512  (1024 tokens)", "~50 foveal + 49 pool = 99", "~90% ↓"],
  ["1024×1024  (4096 tokens)", "~80 foveal + 49 pool = 129", "~97% ↓"],
];

export function AggregatedAttentionTheory() {
  return (
    <Stack gap="lg">
      <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
        The human eye concentrates its sharpest photoreceptors in a tiny central
        pit, the{" "}
        <Text span c="white" fw={500}>
          fovea,
        </Text>{" "}
        covering roughly 2° of our visual field. Everything beyond that is
        handled by lower-resolution peripheral vision. TransNeXt's{" "}
        <Text span c="white" fw={500}>
          Aggregated Attention
        </Text>{" "}
        replicates this two-zone strategy inside the Transformer.
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
          THE MECHANISM
        </Text>

        <Stack gap={10}>
          {/* Standard ViT */}
          <Box>
            <Text size="sm" fw={600} mb={5} style={{ color: "#a0a0a0" }}>
              Standard ViT
            </Text>
            <Box
              px="sm"
              py={8}
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 6,
                fontFamily: "monospace",
              }}
            >
              <Text
                size="sm"
                style={{ fontFamily: "monospace", color: "#a0a0a0" }}
              >
                Attn(Q, K, V){"  "}← N × N pairs{"  "}
                <Text span style={{ color: "#ef4444" }} fw={700}>
                  O(N²)
                </Text>
              </Text>
            </Box>
          </Box>

          {/* TransNeXt */}
          <Box>
            <Text size="sm" fw={600} mb={5} style={{ color: "#22c55e" }}>
              TransNeXt
            </Text>
            <Box
              px="sm"
              py={8}
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 6,
                fontFamily: "monospace",
              }}
            >
              <Text
                size="sm"
                style={{ fontFamily: "monospace", color: "#a0a0a0" }}
              >
                Attn(Q,{" "}
                <Text span c="white">
                  K_near
                </Text>
                ) + Attn(Q,{" "}
                <Text span c="white">
                  Pool(K_far)
                </Text>
                ){"\n"}
              </Text>
              <Text
                size="sm"
                style={{ fontFamily: "monospace", color: "#a0a0a0" }}
                mt={4}
              >
                {"→ "}K_foveal {"+"} M pairs,{"  "}M ={" "}
                <Text span c="white" fw={700}>
                  49 (fixed)
                </Text>
                {"   "}
                <Text span style={{ color: "#22c55e" }} fw={700}>
                  O(K + M)
                </Text>
              </Text>
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Fixed pool size */}
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
          mb={8}
          style={{ letterSpacing: "0.1em", color: "#22c55e" }}
        >
          FIXED POOL SIZE: 7×7 = 49
        </Text>
        <Text size="md" style={{ lineHeight: 1.8, color: "#a0a0a0" }} mb={10}>
          Peripheral tokens, regardless of resolution, are spatially
          average-pooled into a constant{" "}
          <Text span c="white" fw={600}>
            7×7 grid
          </Text>
          . The peripheral attention cost becomes O(1), invariant to image
          scale. Efficiency gains compound at higher resolutions:
        </Text>

        <Stack gap={6}>
          {SCALE_ROWS.map(([res, conn, reduction]) => (
            <Group key={res} gap={0} justify="space-between" wrap="nowrap">
              <Text
                size="sm"
                style={{ fontFamily: "monospace", color: "#707070", flex: 1 }}
              >
                {res}
              </Text>
              <Text
                size="sm"
                style={{
                  fontFamily: "monospace",
                  color: "#a0a0a0",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {conn}
              </Text>
              <Text
                size="sm"
                fw={700}
                style={{ color: "#22c55e", textAlign: "right", minWidth: 52 }}
              >
                {reduction}
              </Text>
            </Group>
          ))}
        </Stack>
      </Box>

      <Text size="md" style={{ lineHeight: 1.9, color: "#a0a0a0" }}>
        The fixed spatial layout of the 7×7 pool also introduces{" "}
        <Text span c="white" fw={500}>
          spatial robustness
        </Text>
        : attention patterns learn a consistent positional prior across the
        peripheral grid, making the model more stable to slight spatial shifts,
        a key finding in the spatial robustness experiments with the pet
        dataset.
      </Text>

      <Text
        size="sm"
        style={{ lineHeight: 1.8, fontStyle: "italic", color: "#707070" }}
      >
        → Move your cursor over the image. Toggle between Standard ViT and
        TransNeXt to see the connection count drop.
      </Text>
    </Stack>
  );
}
