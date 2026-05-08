import { useState } from "react";
import { Box, Text, Paper } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

const COLS = 7;
const ROWS = 7;
const PATCH = 42;
const GAP = 3;
const TOTAL = COLS * ROWS;
const SVG_W = COLS * (PATCH + GAP) - GAP;
const SVG_H = ROWS * (PATCH + GAP) - GAP;

interface Patch {
  idx: number;
  row: number;
  col: number;
  cx: number;
  cy: number;
}

const PATCHES: Patch[] = Array.from({ length: TOTAL }, (_, idx) => {
  const row = Math.floor(idx / COLS);
  const col = idx % COLS;
  return {
    idx,
    row,
    col,
    cx: col * (PATCH + GAP) + PATCH / 2,
    cy: row * (PATCH + GAP) + PATCH / 2,
  };
});

export function GridViTPlayground() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const hovered = hoveredIdx !== null ? PATCHES[hoveredIdx] : null;
  const others =
    hoveredIdx !== null ? PATCHES.filter((p) => p.idx !== hoveredIdx) : [];

  return (
    <Paper
      radius="lg"
      style={{ backgroundColor: "#0c0c0f", border: "1px solid #2a2a2e", overflow: "hidden" }}
    >
      {/* Header */}
      <Box px="lg" py="md" style={{ borderBottom: "1px solid #2a2a2e" }}>
        <Text
          size="sm"
          fw={700}
          mb={4}
          style={{ letterSpacing: "0.1em", color: "#707070" }}
        >
          STANDARD ViT · GLOBAL SELF-ATTENTION
        </Text>
        <Text size="sm" style={{ color: "#707070", minHeight: 18 }}>
          {hovered
            ? `Patch [${hovered.row}, ${hovered.col}] attends to all ${TOTAL - 1} other patches`
            : "Hover a patch to reveal its attention connections"}
        </Text>
      </Box>

      {/* Grid */}
      <Box
        p="lg"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        <Box
          style={{ position: "relative", width: SVG_W, height: SVG_H }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Filament SVG */}
          <svg
            width={SVG_W}
            height={SVG_H}
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
          >
            <defs>
              <filter id="vit-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <AnimatePresence>
              {hovered &&
                others.map((target, i) => (
                  <motion.line
                    key={`${hoveredIdx}-${target.idx}`}
                    x1={hovered.cx}
                    y1={hovered.cy}
                    x2={target.cx}
                    y2={target.cy}
                    stroke="rgba(232, 160, 32, 0.45)"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    filter="url(#vit-glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.07 } }}
                    transition={{ duration: 0.14, delay: i * 0.003 }}
                  />
                ))}
            </AnimatePresence>
          </svg>

          {/* Patch cells */}
          {PATCHES.map((patch) => {
            const isHovered = patch.idx === hoveredIdx;
            const isConnected = hoveredIdx !== null && !isHovered;

            return (
              <motion.div
                key={patch.idx}
                style={{
                  position: "absolute",
                  left: patch.col * (PATCH + GAP),
                  top: patch.row * (PATCH + GAP),
                  width: PATCH,
                  height: PATCH,
                  borderRadius: 4,
                  border: "1px solid",
                  cursor: "crosshair",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontFamily: "monospace",
                  userSelect: "none",
                  zIndex: isHovered ? 10 : 1,
                }}
                animate={{
                  backgroundColor: isHovered
                    ? "rgba(232, 160, 32, 0.28)"
                    : isConnected
                    ? "rgba(232, 160, 32, 0.06)"
                    : "rgba(40, 40, 44, 0.5)",
                  borderColor: isHovered
                    ? "rgba(232, 160, 32, 0.9)"
                    : isConnected
                    ? "rgba(232, 160, 32, 0.3)"
                    : "#2a2a2e",
                  color: isHovered
                    ? "#e8a020"
                    : isConnected
                    ? "rgba(232, 160, 32, 0.45)"
                    : "#3a3a40",
                  scale: isHovered ? 1.1 : 1,
                  boxShadow: isHovered
                    ? "0 0 12px 0px rgba(232, 160, 32, 0.4)"
                    : "0 0 0px 0px rgba(232, 160, 32, 0)",
                }}
                transition={{ duration: 0.13 }}
                onMouseEnter={() => setHoveredIdx(patch.idx)}
              >
                {patch.row},{patch.col}
              </motion.div>
            );
          })}
        </Box>

        {/* Complexity indicator */}
        <Box
          px="md"
          py={8}
          style={{
            background: "rgba(239, 68, 68, 0.06)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: 8,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Text size="sm" style={{ color: "#ef4444" }}>
            {COLS}×{ROWS} grid ={" "}
            <Text span fw={700}>{TOTAL} patches</Text>
            {" → "}
            <Text span fw={700}>{TOTAL * TOTAL}</Text> attention pairs{" "}
            <Text span fw={600} style={{ color: "#ef4444" }}>(O(N²))</Text>
          </Text>
        </Box>
      </Box>
    </Paper>
  );
}
