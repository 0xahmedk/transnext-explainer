import { useState, useRef } from "react";
import { Box, Text, Paper, SegmentedControl } from "@mantine/core";
import { motion, useMotionValue, useSpring } from "framer-motion";
import petImage from "../assets/pet_image.jpg";

const COLS = 9;
const ROWS = 7;
const CONTAINER_W = 378;
const CONTAINER_H = 280;
const PATCH_W = CONTAINER_W / COLS;
const PATCH_H = CONTAINER_H / ROWS;
const FOVEAL_RADIUS = 78;
const POOL_COLS = 3;
const POOL_ROWS_COUNT = 3;
const POOL_W = CONTAINER_W / POOL_COLS;
const POOL_H = CONTAINER_H / POOL_ROWS_COUNT;

type Mode = "standard" | "transnext";

interface Patch {
  idx: number;
  row: number;
  col: number;
  cx: number;
  cy: number;
  poolKey: string;
  poolCx: number;
  poolCy: number;
  poolX: number;
  poolY: number;
}

const PATCHES: Patch[] = Array.from({ length: COLS * ROWS }, (_, idx) => {
  const row = Math.floor(idx / COLS);
  const col = idx % COLS;
  const poolRow = Math.floor((row * POOL_ROWS_COUNT) / ROWS);
  const poolCol = Math.floor((col * POOL_COLS) / COLS);
  return {
    idx,
    row,
    col,
    cx: (col + 0.5) * PATCH_W,
    cy: (row + 0.5) * PATCH_H,
    poolKey: `${poolRow}-${poolCol}`,
    poolCx: (poolCol + 0.5) * POOL_W,
    poolCy: (poolRow + 0.5) * POOL_H,
    poolX: poolCol * POOL_W,
    poolY: poolRow * POOL_H,
  };
});

const dist = (ax: number, ay: number, bx: number, by: number) =>
  Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);

export function FovealLensPlayground() {
  const [mode, setMode] = useState<Mode>("transnext");
  const [cursor, setCursor] = useState({
    x: CONTAINER_W / 2,
    y: CONTAINER_H / 2,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(CONTAINER_W / 2);
  const rawY = useMotionValue(CONTAINER_H / 2);
  const ringX = useSpring(rawX, { stiffness: 360, damping: 30 });
  const ringY = useSpring(rawY, { stiffness: 360, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(CONTAINER_W, e.clientX - rect.left));
    const y = Math.max(0, Math.min(CONTAINER_H, e.clientY - rect.top));
    setCursor({ x, y });
    rawX.set(x);
    rawY.set(y);
  };

  const fovealPatches = PATCHES.filter(
    (p) => dist(cursor.x, cursor.y, p.cx, p.cy) <= FOVEAL_RADIUS,
  );
  const peripheralPatches = PATCHES.filter(
    (p) => dist(cursor.x, cursor.y, p.cx, p.cy) > FOVEAL_RADIUS,
  );

  const activePoolMap = new Map<string, Patch>();
  for (const p of peripheralPatches) {
    if (!activePoolMap.has(p.poolKey)) activePoolMap.set(p.poolKey, p);
  }
  const activePoolBlocks = [...activePoolMap.values()];

  const totalStd = COLS * ROWS;
  const totalTnx = fovealPatches.length + activePoolBlocks.length;
  const reduction = Math.round((1 - totalTnx / totalStd) * 100);

  return (
    <Paper
      radius="lg"
      style={{
        backgroundColor: "#0c0c0f",
        border: "1px solid #2a2a2e",
        overflow: "hidden",
      }}
    >
      {/* Header + toggle */}
      <Box
        px="lg"
        py="md"
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
          <Text
            size="sm"
            fw={700}
            mb={2}
            style={{ letterSpacing: "0.1em", color: "#707070" }}
          >
            FOVEAL LENS SIMULATION
          </Text>
          <Text size="sm" style={{ color: "#707070" }}>
            Move cursor over the image below
          </Text>
        </Box>
        <SegmentedControl
          size="xs"
          value={mode}
          onChange={(v) => setMode(v as Mode)}
          data={[
            { label: "Standard ViT", value: "standard" },
            { label: "TransNeXt", value: "transnext" },
          ]}
          styles={{
            root: { backgroundColor: "#18181b", border: "1px solid #2a2a2e" },
            label: { fontSize: 11, fontWeight: 600 },
          }}
        />
      </Box>

      {/* Viz */}
      <Box
        px="lg"
        pt="md"
        pb="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Box
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{
            position: "relative",
            width: CONTAINER_W,
            height: CONTAINER_H,
            borderRadius: 8,
            overflow: "hidden",
            cursor: "crosshair",
            flexShrink: 0,
          }}
        >
          {/* Pet image */}
          <img
            src={petImage}
            alt="Pet dataset sample"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Dim overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.55)",
            }}
          />

          {/* SVG overlay */}
          <svg
            width={CONTAINER_W}
            height={CONTAINER_H}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <defs>
              <filter id="fl-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="ring-glow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {mode === "transnext" ? (
              <>
                {/* Pool block outlines */}
                {activePoolBlocks.map((p) => (
                  <rect
                    key={`pool-rect-${p.poolKey}`}
                    x={p.poolX + 3}
                    y={p.poolY + 3}
                    width={POOL_W - 6}
                    height={POOL_H - 6}
                    fill="rgba(34, 197, 94, 0.04)"
                    stroke="rgba(34, 197, 94, 0.35)"
                    strokeWidth={1.5}
                    rx={4}
                  />
                ))}

                {/* Patch cells */}
                {PATCHES.map((p) => {
                  const isFoveal =
                    dist(cursor.x, cursor.y, p.cx, p.cy) <= FOVEAL_RADIUS;
                  return (
                    <rect
                      key={`patch-${p.idx}`}
                      x={p.col * PATCH_W + 1}
                      y={p.row * PATCH_H + 1}
                      width={PATCH_W - 2}
                      height={PATCH_H - 2}
                      fill={
                        isFoveal
                          ? "rgba(232, 160, 32, 0.12)"
                          : "rgba(255,255,255,0.01)"
                      }
                      stroke={
                        isFoveal
                          ? "rgba(232, 160, 32, 0.5)"
                          : "rgba(255,255,255,0.04)"
                      }
                      strokeWidth={isFoveal ? 1 : 0.5}
                      rx={2}
                    />
                  );
                })}

                {/* Foveal spikes */}
                {fovealPatches.map((p) => (
                  <circle
                    key={`spike-${p.idx}`}
                    cx={p.cx}
                    cy={p.cy}
                    r={2.8}
                    fill="rgba(232, 160, 32, 0.9)"
                    filter="url(#fl-glow)"
                  />
                ))}

                {/* Pool lines (green dashed) */}
                {activePoolBlocks.map((p) => (
                  <line
                    key={`pool-line-${p.poolKey}`}
                    x1={cursor.x}
                    y1={cursor.y}
                    x2={p.poolCx}
                    y2={p.poolCy}
                    stroke="rgba(34, 197, 94, 0.55)"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeDasharray="5 3"
                  />
                ))}

                {/* Foveal lines (amber solid) */}
                {fovealPatches.map((p) => (
                  <line
                    key={`foveal-line-${p.idx}`}
                    x1={cursor.x}
                    y1={cursor.y}
                    x2={p.cx}
                    y2={p.cy}
                    stroke="rgba(232, 160, 32, 0.4)"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                  />
                ))}

                {/* Pool center dots */}
                {activePoolBlocks.map((p) => (
                  <circle
                    key={`pool-dot-${p.poolKey}`}
                    cx={p.poolCx}
                    cy={p.poolCy}
                    r={4.5}
                    fill="rgba(34, 197, 94, 0.8)"
                    filter="url(#fl-glow)"
                  />
                ))}

                {/* Spring-animated foveal ring */}
                <motion.g style={{ translateX: ringX, translateY: ringY }}>
                  <circle
                    cx={0}
                    cy={0}
                    r={FOVEAL_RADIUS + 3}
                    fill="none"
                    stroke="rgba(232, 160, 32, 0.1)"
                    strokeWidth={8}
                  />
                  <circle
                    cx={0}
                    cy={0}
                    r={FOVEAL_RADIUS}
                    fill="none"
                    stroke="rgba(232, 160, 32, 0.7)"
                    strokeWidth={1.5}
                    filter="url(#ring-glow)"
                  />
                  <circle
                    cx={0}
                    cy={0}
                    r={FOVEAL_RADIUS - 4}
                    fill="none"
                    stroke="rgba(232, 160, 32, 0.08)"
                    strokeWidth={3}
                  />
                </motion.g>

                {/* Cursor dot */}
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r={4}
                  fill="rgba(232, 160, 32, 0.95)"
                  filter="url(#fl-glow)"
                />
              </>
            ) : (
              <>
                {/* Standard ViT uniform grid */}
                {PATCHES.map((p) => (
                  <rect
                    key={`std-patch-${p.idx}`}
                    x={p.col * PATCH_W + 1}
                    y={p.row * PATCH_H + 1}
                    width={PATCH_W - 2}
                    height={PATCH_H - 2}
                    fill="rgba(232, 160, 32, 0.04)"
                    stroke="rgba(232, 159, 32, 0.449)"
                    strokeWidth={0.75}
                    rx={2}
                  />
                ))}

                {/* Lines to all patches */}
                {PATCHES.map((p) => (
                  <line
                    key={`std-line-${p.idx}`}
                    x1={cursor.x}
                    y1={cursor.y}
                    x2={p.cx}
                    y2={p.cy}
                    stroke="rgba(233, 92, 84, 0.95)"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                  />
                ))}

                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r={4}
                  fill="rgba(233, 92, 84, 0.95)"
                  filter="url(#fl-glow)"
                />
              </>
            )}
          </svg>
        </Box>

        {/* Stats */}
        {mode === "transnext" ? (
          <Box
            px="md"
            py={8}
            style={{
              background: "rgba(34, 197, 94, 0.05)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: 8,
              textAlign: "center",
              width: "100%",
            }}
          >
            <Text size="sm">
              <Text span style={{ color: "#e8a020" }} fw={600}>
                {fovealPatches.length} foveal
              </Text>
              <Text span style={{ color: "#707070" }}>
                {" "}
                +{" "}
              </Text>
              <Text span style={{ color: "#22c55e" }} fw={600}>
                {activePoolBlocks.length} pool blocks
              </Text>
              <Text span style={{ color: "#707070" }}>
                {" "}
                ={" "}
              </Text>
              <Text span c="white" fw={700}>
                {totalTnx} connections
              </Text>
              <Text span style={{ color: "#707070" }}>
                {" "}
                vs {totalStd} (ViT) →{" "}
              </Text>
              <Text span style={{ color: "#22c55e" }} fw={700}>
                {reduction}% reduction
              </Text>
            </Text>
          </Box>
        ) : (
          <Box
            px="md"
            py={8}
            style={{
              background: "rgba(239, 68, 68, 0.05)",
              border: "1px solid rgba(239, 68, 68, 0.18)",
              borderRadius: 8,
              textAlign: "center",
              width: "100%",
            }}
          >
            <Text size="sm" style={{ color: "#ef4444" }}>
              {COLS}×{ROWS} grid, query attends to all{" "}
              <Text span fw={700}>
                {totalStd}
              </Text>{" "}
              patches uniformly{" "}
              <Text span fw={600} style={{ color: "#ef4444" }}>
                (O(N²))
              </Text>
            </Text>
          </Box>
        )}

        {/* Legend */}
        {mode === "transnext" && (
          <Box
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                color: "rgba(232, 160, 32, 0.85)",
                label: "Foveal (direct)",
                dashed: false,
              },
              {
                color: "rgba(34, 197, 94, 0.85)",
                label: "Peripheral (pooled)",
                dashed: true,
              },
            ].map(({ color, label, dashed }) => (
              <Box
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <svg width={24} height={8}>
                  <line
                    x1={0}
                    y1={4}
                    x2={24}
                    y2={4}
                    stroke={color}
                    strokeWidth={dashed ? 2 : 1.5}
                    strokeDasharray={dashed ? "4 2" : undefined}
                    strokeLinecap="round"
                  />
                </svg>
                <Text size="xs" style={{ color: "#707070", fontSize: 11 }}>
                  {label}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
