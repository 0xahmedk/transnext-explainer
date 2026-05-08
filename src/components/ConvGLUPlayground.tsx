import { useState, useEffect } from "react";
import { Box, Text, Paper } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "split" | "process" | "merge" | "output";

const PHASE_ORDER: Phase[] = ["split", "process", "merge", "output"];
const PHASE_DURATION: Record<Phase, number> = {
  idle: 0,
  split: 650,
  process: 1500,
  merge: 750,
  output: 2500,
};
const PHASE_IDX: Record<Phase, number> = {
  idle: 0, split: 1, process: 2, merge: 3, output: 4,
};

const AMBER = "#e8a020";
const GREEN = "#22c55e";
const GRAY = "#a0a0a0";

const atLeast = (phase: Phase, target: Phase) =>
  PHASE_IDX[phase] >= PHASE_IDX[target];

// SVG lines: center-top → left & right drops (fork shape)
function ForkSVG({ active }: { active: boolean }) {
  const w = 280, h = 36, cx = 140, lx = 60, rx = 220, mid = 20;
  const s = active ? "rgba(232,160,32,0.55)" : "#2a2a2e";
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {[
        [cx, 0, cx, mid],
        [lx, mid, rx, mid],
        [lx, mid, lx, h],
        [rx, mid, rx, h],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={s} strokeWidth={2} strokeLinecap="round"
          style={{ transition: "stroke 0.35s" }}
        />
      ))}
    </svg>
  );
}

// SVG lines: left & right tops → center-bottom (merge shape)
function MergeSVG({ active }: { active: boolean }) {
  const w = 280, h = 36, cx = 140, lx = 60, rx = 220, mid = 18;
  const ls = active ? "rgba(232,160,32,0.55)" : "#2a2a2e";
  const rs = active ? "rgba(160,160,160,0.45)" : "#2a2a2e";
  const cs = active ? "rgba(232,160,32,0.55)" : "#2a2a2e";
  const segs: [number, number, number, number, string][] = [
    [lx, 0, lx, mid, ls],
    [rx, 0, rx, mid, rs],
    [lx, mid, cx, mid, ls],
    [rx, mid, cx, mid, rs],
    [cx, mid, cx, h, cs],
  ];
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {segs.map(([x1, y1, x2, y2, stroke], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={stroke} strokeWidth={2} strokeLinecap="round"
          style={{ transition: "stroke 0.35s" }}
        />
      ))}
    </svg>
  );
}

// Tensor block with stacked-layer 3D depth effect
function TensorBlock({
  label, sublabel, color, active, glow,
}: {
  label: string; sublabel?: string; color: string; active: boolean; glow?: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.25, scale: glow && active ? 1.04 : 1 }}
      transition={{ duration: 0.35 }}
      style={{ position: "relative", userSelect: "none" }}
    >
      <Box style={{
        position: "absolute", top: -5, left: 5, width: "100%", height: "100%",
        borderRadius: 7, background: `${color}10`, border: `1px solid ${color}25`,
      }} />
      <Box style={{
        position: "absolute", top: -2.5, left: 2.5, width: "100%", height: "100%",
        borderRadius: 7, background: `${color}18`, border: `1px solid ${color}35`,
      }} />
      <Box style={{
        position: "relative",
        padding: "8px 16px",
        borderRadius: 7,
        background: `${color}10`,
        border: `1.5px solid ${active ? color + "88" : color + "28"}`,
        textAlign: "center",
        minWidth: 108,
        boxShadow: glow && active ? `0 0 22px ${color}45` : "none",
        transition: "box-shadow 0.4s, border-color 0.35s",
      }}>
        <Text size="sm" fw={700} style={{
          color: active ? color : color + "45",
          fontFamily: "monospace",
          fontSize: 11,
          letterSpacing: "0.02em",
          transition: "color 0.35s",
        }}>
          {label}
        </Text>
        {sublabel && (
          <Text size="xs" style={{
            color: active ? "#606060" : "#333",
            marginTop: 2,
            transition: "color 0.35s",
          }}>
            {sublabel}
          </Text>
        )}
      </Box>
    </motion.div>
  );
}

// 3×3 depth-wise conv grid visualization
function ConvGrid({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.2 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 4,
        padding: 8,
        borderRadius: 8,
        background: active ? "rgba(232,160,32,0.07)" : "rgba(232,160,32,0.03)",
        border: `1.5px solid ${active ? "rgba(232,160,32,0.45)" : "rgba(232,160,32,0.12)"}`,
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      {Array.from({ length: 9 }, (_, i) => {
        const isCenter = i === 4;
        return (
          <motion.div
            key={i}
            animate={{
              backgroundColor: active
                ? isCenter ? "rgba(232,160,32,0.78)" : "rgba(232,160,32,0.22)"
                : "rgba(232,160,32,0.05)",
              boxShadow: active && isCenter ? "0 0 8px rgba(232,160,32,0.7)" : "none",
            }}
            transition={{ duration: 0.2, delay: active ? i * 0.05 : 0 }}
            style={{ width: 22, height: 22, borderRadius: 3 }}
          />
        );
      })}
    </motion.div>
  );
}

// Simple vertical connector line
function VLine({
  active, height = 24, color = AMBER,
}: { active: boolean; height?: number; color?: string }) {
  return (
    <Box style={{
      width: 2,
      height,
      borderRadius: 1,
      background: active ? `${color}80` : "#2a2a2e",
      margin: "0 auto",
      transition: "background 0.35s",
    }} />
  );
}

const HEADER_TEXT: Record<Phase, string> = {
  idle: "Press play to animate the forward pass",
  split: "Input projected into two parallel streams…",
  process: "Gate branch spatially convolved by DW 3×3…",
  merge: "Streams combined element-wise (Hadamard ⊙)…",
  output: "Spatially-enriched output projected back to D",
};

export function ConvGLUPlayground() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      if (idx >= PHASE_ORDER.length) {
        setIsRunning(false);
        return;
      }
      const p = PHASE_ORDER[idx];
      setPhase(p);
      idx++;
      timer = setTimeout(advance, PHASE_DURATION[p]);
    };

    timer = setTimeout(advance, 200);
    return () => clearTimeout(timer);
  }, [isRunning]);

  const handlePlay = () => {
    setPhase("idle");
    setIsRunning(true);
  };

  const done = phase === "output" && !isRunning;
  const p = phase;

  return (
    <Paper radius="lg" style={{ backgroundColor: "#0c0c0f", border: "1px solid #2a2a2e", overflow: "hidden" }}>
      {/* Header */}
      <Box
        px="lg" py="md"
        style={{
          borderBottom: "1px solid #2a2a2e",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Text size="sm" fw={700} mb={2} style={{ letterSpacing: "0.1em", color: "#707070" }}>
            ConvGLU FORWARD PASS
          </Text>
          <Text size="sm" style={{ color: "#707070", minHeight: 18 }}>
            {HEADER_TEXT[phase]}
          </Text>
        </Box>
        <button
          onClick={handlePlay}
          disabled={isRunning}
          style={{
            padding: "6px 16px",
            background: isRunning ? "rgba(232,160,32,0.05)" : "rgba(232,160,32,0.13)",
            border: `1px solid rgba(232,160,32,${isRunning ? "0.18" : "0.45"})`,
            borderRadius: 7,
            color: isRunning ? "rgba(232,160,32,0.4)" : AMBER,
            fontSize: 11,
            fontWeight: 700,
            cursor: isRunning ? "not-allowed" : "pointer",
            letterSpacing: "0.08em",
            transition: "all 0.2s",
          }}
        >
          {isRunning ? "RUNNING…" : done ? "↺  REPLAY" : "▶  PLAY"}
        </button>
      </Box>

      {/* Diagram */}
      <Box px="lg" pt="md" pb="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Input tensor */}
        <TensorBlock label="x  ∈  ℝᴺˣᴰ" sublabel="input tokens" color={AMBER} active={atLeast(p, "split")} />
        <VLine active={atLeast(p, "split")} />

        {/* Fork */}
        <ForkSVG active={atLeast(p, "split")} />

        {/* Parallel streams */}
        <Box style={{ display: "flex", gap: 40, width: 280 }}>

          {/* Gate branch */}
          <Box style={{ width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <TensorBlock label="W_up1(x)" sublabel="gate proj" color={AMBER} active={atLeast(p, "split")} />
            <VLine active={atLeast(p, "process")} height={18} />
            <ConvGrid active={atLeast(p, "process")} />
            <Box style={{
              padding: "2px 8px",
              borderRadius: 4,
              background: atLeast(p, "process") ? "rgba(232,160,32,0.07)" : "transparent",
              border: `1px solid ${atLeast(p, "process") ? "rgba(232,160,32,0.22)" : "transparent"}`,
              transition: "all 0.35s",
            }}>
              <Text size="xs" style={{
                fontFamily: "monospace",
                color: atLeast(p, "process") ? "#707070" : "#2a2a2e",
                transition: "color 0.35s",
              }}>
                DW-Conv 3×3
              </Text>
            </Box>
          </Box>

          {/* Value branch */}
          <Box style={{ width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <TensorBlock label="W_up2(x)" sublabel="value proj" color={GRAY} active={atLeast(p, "split")} />
            <Box style={{
              width: 2, height: 76, borderRadius: 1, margin: "0 auto",
              background: atLeast(p, "split") ? "rgba(160,160,160,0.35)" : "#2a2a2e",
              transition: "background 0.35s",
            }} />
            <Box style={{
              padding: "2px 8px", borderRadius: 4,
              border: `1px solid ${atLeast(p, "split") ? "rgba(160,160,160,0.2)" : "transparent"}`,
              transition: "all 0.35s",
            }}>
              <Text size="xs" style={{
                fontFamily: "monospace",
                color: atLeast(p, "split") ? "#555" : "#2a2a2e",
                transition: "color 0.35s",
              }}>
                identity
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Merge */}
        <MergeSVG active={atLeast(p, "merge")} />

        {/* Hadamard node */}
        <motion.div
          animate={{
            scale: atLeast(p, "merge") ? 1 : 0.82,
            opacity: atLeast(p, "merge") ? 1 : 0.18,
          }}
          transition={{ duration: 0.35 }}
          style={{
            width: 44, height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: atLeast(p, "merge") ? "rgba(232,160,32,0.13)" : "rgba(232,160,32,0.04)",
            border: `2px solid ${atLeast(p, "merge") ? "rgba(232,160,32,0.75)" : "#2a2a2e"}`,
            boxShadow: atLeast(p, "merge") ? "0 0 18px rgba(232,160,32,0.4)" : "none",
            transition: "background 0.35s, border-color 0.35s, box-shadow 0.4s",
          }}
        >
          <Text fw={800} style={{ color: AMBER, fontSize: 20, lineHeight: 1 }}>⊙</Text>
        </motion.div>

        <VLine active={atLeast(p, "output")} />

        {/* W_down */}
        <TensorBlock label="W_down( · )" sublabel="project back to D" color={GREEN} active={atLeast(p, "output")} />
        <VLine active={atLeast(p, "output")} color={GREEN} />

        {/* Output */}
        <TensorBlock
          label="y  ∈  ℝᴺˣᴰ"
          sublabel="spatially enriched"
          color={GREEN}
          active={atLeast(p, "output")}
          glow
        />

        {/* Formula */}
        <AnimatePresence>
          {atLeast(p, "output") && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              style={{
                marginTop: 16,
                padding: "9px 18px",
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.22)",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <Text size="sm" style={{ fontFamily: "monospace", color: "#a0a0a0", letterSpacing: "0.02em" }}>
                {"y = W_down( "}
                <Text span fw={700} style={{ color: AMBER }}>DW₃ₓ₃</Text>
                {"(W_up1(x))  "}
                <Text span fw={800} style={{ color: "#fff" }}>⊙</Text>
                {"  W_up2(x) )"}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>

      </Box>
    </Paper>
  );
}
