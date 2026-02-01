import { Box, Text, Stack } from "@mantine/core";
import { motion } from "framer-motion";

interface NeuronProps {
  /** Label displayed above the neuron */
  label: string;
  /** Fill level percentage (0-100) */
  fillLevel: number;
  /** Current value (displayed as text) */
  value: number;
  /** Size of the neuron container */
  size?: number;
  /** Color of the fill */
  fillColor?: string;
}

/**
 * Animated Neuron Container Component
 *
 * Visualizes a neuron as a container that fills/drains based on its value.
 * Uses Framer Motion for smooth fluid animations.
 */
export function Neuron({
  label,
  fillLevel,
  value,
  size = 120,
  fillColor = "#228be6",
}: NeuronProps) {
  return (
    <Stack gap="xs" align="center">
      <Text size="sm" fw={600} c="dimmed">
        {label}
      </Text>

      {/* Neuron Container */}
      <Box
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          border: "3px solid var(--mantine-color-gray-6)",
          overflow: "hidden",
          backgroundColor: "var(--mantine-color-dark-7)",
        }}
      >
        {/* Animated Fill */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: fillColor,
            opacity: 0.8,
          }}
          animate={{
            height: `${Math.max(0, Math.min(100, fillLevel))}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.5,
          }}
        />

        {/* Value Display (centered) */}
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Text
            size="xl"
            fw={700}
            c="white"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {value.toFixed(2)}
          </Text>
        </Box>
      </Box>

      {/* Fill Percentage */}
      <Text size="xs" c="dimmed">
        {fillLevel.toFixed(0)}%
      </Text>
    </Stack>
  );
}
