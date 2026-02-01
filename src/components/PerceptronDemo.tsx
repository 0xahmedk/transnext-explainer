import { useState } from "react";
import {
  Card,
  Stack,
  Group,
  Text,
  Slider,
  Badge,
  Box,
  SegmentedControl,
  Paper,
  Title,
  Divider,
} from "@mantine/core";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { usePerceptron } from "../hooks/usePerceptron";
import { Neuron } from "./Neuron";
import type { ActivationFunctionType } from "../types";

/**
 * Interactive Perceptron Demo Component
 *
 * Demonstrates the Perceptron as a mathematical "valve" where:
 * - Inputs flow in and are multiplied by weights
 * - All weighted inputs are summed with bias
 * - The activation function determines the final output
 * - Visual neurons show fill levels based on their values
 */
export function PerceptronDemo() {
  // Input states
  const [input1, setInput1] = useState(0.5);
  const [input2, setInput2] = useState(0.7);

  // Weight states
  const [weight1, setWeight1] = useState(0.6);
  const [weight2, setWeight2] = useState(0.4);

  // Bias and activation function
  const [bias, setBias] = useState(0);
  const [activationFn, setActivationFn] =
    useState<ActivationFunctionType>("sigmoid");

  // Compute perceptron output
  const { weightedSum, finalOutput, fillLevel } = usePerceptron({
    inputs: [input1, input2],
    weights: [weight1, weight2],
    bias,
    activationFunction: activationFn,
  });

  return (
    <Card shadow="md" padding="xl" radius="md" withBorder>
      <Stack gap="xl">
        <Box>
          <Group justify="space-between" mb="xs">
            <Title order={3}>
              <Group gap="xs">
                <Zap size={24} />
                <span>Interactive Perceptron</span>
              </Group>
            </Title>
            <Badge size="lg" variant="light">
              Live Demo
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Adjust the sliders to see how inputs, weights, and bias affect the
            neuron's output
          </Text>
        </Box>

        <Divider />

        {/* Visual Representation */}
        <Box>
          <Group justify="center" gap="xl" wrap="nowrap">
            {/* Input Neurons */}
            <Stack gap="lg">
              <Neuron
                label="Input 1"
                value={input1}
                fillLevel={input1 * 100}
                fillColor="#12b886"
              />
              <Neuron
                label="Input 2"
                value={input2}
                fillLevel={input2 * 100}
                fillColor="#12b886"
              />
            </Stack>

            {/* Connection Arrow */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight
                size={32}
                strokeWidth={2.5}
                color="var(--mantine-color-blue-5)"
              />
            </motion.div>

            {/* Output Neuron */}
            <Neuron
              label="Output"
              value={finalOutput}
              fillLevel={fillLevel}
              size={140}
              fillColor="#228be6"
            />
          </Group>
        </Box>

        <Divider />

        {/* Controls Section */}
        <Stack gap="lg">
          {/* Inputs */}
          <Paper p="md" withBorder>
            <Text fw={600} mb="md">
              Inputs (0 to 1)
            </Text>
            <Stack gap="md">
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Input 1</Text>
                  <Badge variant="light" color="teal">
                    {input1.toFixed(2)}
                  </Badge>
                </Group>
                <Slider
                  value={input1}
                  onChange={setInput1}
                  min={0}
                  max={1}
                  step={0.01}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 0.5, label: "0.5" },
                    { value: 1, label: "1" },
                  ]}
                  color="teal"
                />
              </Box>

              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Input 2</Text>
                  <Badge variant="light" color="teal">
                    {input2.toFixed(2)}
                  </Badge>
                </Group>
                <Slider
                  value={input2}
                  onChange={setInput2}
                  min={0}
                  max={1}
                  step={0.01}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 0.5, label: "0.5" },
                    { value: 1, label: "1" },
                  ]}
                  color="teal"
                />
              </Box>
            </Stack>
          </Paper>

          {/* Weights */}
          <Paper p="md" withBorder>
            <Text fw={600} mb="md">
              Weights (-1 to 1)
            </Text>
            <Stack gap="md">
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Weight 1</Text>
                  <Badge variant="light" color="violet">
                    {weight1.toFixed(2)}
                  </Badge>
                </Group>
                <Slider
                  value={weight1}
                  onChange={setWeight1}
                  min={-1}
                  max={1}
                  step={0.01}
                  marks={[
                    { value: -1, label: "-1" },
                    { value: 0, label: "0" },
                    { value: 1, label: "1" },
                  ]}
                  color="violet"
                />
              </Box>

              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Weight 2</Text>
                  <Badge variant="light" color="violet">
                    {weight2.toFixed(2)}
                  </Badge>
                </Group>
                <Slider
                  value={weight2}
                  onChange={setWeight2}
                  min={-1}
                  max={1}
                  step={0.01}
                  marks={[
                    { value: -1, label: "-1" },
                    { value: 0, label: "0" },
                    { value: 1, label: "1" },
                  ]}
                  color="violet"
                />
              </Box>
            </Stack>
          </Paper>

          {/* Bias */}
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text fw={600}>Bias</Text>
              <Badge variant="light" color="orange">
                {bias.toFixed(2)}
              </Badge>
            </Group>
            <Slider
              value={bias}
              onChange={setBias}
              min={-1}
              max={1}
              step={0.01}
              marks={[
                { value: -1, label: "-1" },
                { value: 0, label: "0" },
                { value: 1, label: "1" },
              ]}
              color="orange"
            />
          </Paper>

          {/* Activation Function */}
          <Paper p="md" withBorder>
            <Text fw={600} mb="md">
              Activation Function
            </Text>
            <SegmentedControl
              fullWidth
              value={activationFn}
              onChange={(value) =>
                setActivationFn(value as ActivationFunctionType)
              }
              data={[
                { label: "Sigmoid", value: "sigmoid" },
                { label: "Step", value: "step" },
                { label: "ReLU", value: "relu" },
              ]}
            />
          </Paper>
        </Stack>

        <Divider />

        {/* Output Information */}
        <Paper
          p="md"
          withBorder
          style={{ backgroundColor: "var(--mantine-color-dark-6)" }}
        >
          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw={600}>Weighted Sum</Text>
              <Text ff="monospace" fw={700} c="blue">
                {weightedSum.toFixed(4)}
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              ({input1.toFixed(2)} × {weight1.toFixed(2)}) + (
              {input2.toFixed(2)} × {weight2.toFixed(2)}) + {bias.toFixed(2)} ={" "}
              {weightedSum.toFixed(4)}
            </Text>

            <Divider my="xs" />

            <Group justify="space-between">
              <Text fw={600}>Final Output</Text>
              <Text ff="monospace" fw={700} c="green" size="lg">
                {finalOutput.toFixed(4)}
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              After applying {activationFn} activation function
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Card>
  );
}
