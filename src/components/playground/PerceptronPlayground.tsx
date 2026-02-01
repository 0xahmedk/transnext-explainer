import { useState } from "react";
import {
  Paper,
  Box,
  Group,
  Stack,
  Text,
  SegmentedControl,
  Badge,
  Title,
} from "@mantine/core";
import { Brain } from "lucide-react";
import { Neuron } from "./Neuron";
import { Connection } from "./Connection";
import { usePerceptron } from "../../hooks/usePerceptron";
import type { ActivationFunctionType } from "../../types";

/**
 * Interactive Perceptron Playground
 *
 * A visual, interactive neural network playground where:
 * - Weight sliders are positioned on connection lines
 * - Bias controls are attached to neurons
 * - Liquid fill animations show neuron activation
 * - Supports different network architectures
 */
export function PerceptronPlayground() {
  // Input values
  const [input1, setInput1] = useState(0.5);
  const [input2, setInput2] = useState(0.7);

  // Weights
  const [weight1, setWeight1] = useState(0.8);
  const [weight2, setWeight2] = useState(0.6);

  // Bias
  const [bias, setBias] = useState(-0.3);

  // Activation function
  const [activationFn, setActivationFn] =
    useState<ActivationFunctionType>("sigmoid");

  // Calculate output
  const { finalOutput, weightedSum } = usePerceptron({
    inputs: [input1, input2],
    weights: [weight1, weight2],
    bias,
    activationFunction: activationFn,
  });

  // Layout configuration (positions in pixels)
  const layout = {
    neuronSize: 100,
    spacing: {
      horizontal: 300,
      vertical: 150,
    },
    padding: {
      top: 80,
      left: 100,
      right: 100,
      bottom: 60,
    },
  };

  // Calculate neuron positions
  const positions = {
    input1: {
      x: layout.padding.left,
      y: layout.padding.top,
    },
    input2: {
      x: layout.padding.left,
      y: layout.padding.top + layout.spacing.vertical,
    },
    output: {
      x: layout.padding.left + layout.spacing.horizontal,
      y: layout.padding.top + layout.spacing.vertical / 2,
    },
  };

  // Calculate center of neurons for connections
  const getNeuronCenter = (pos: { x: number; y: number }) => ({
    x: pos.x + layout.neuronSize / 2,
    y: pos.y + layout.neuronSize / 2,
  });

  const input1Center = getNeuronCenter(positions.input1);
  const input2Center = getNeuronCenter(positions.input2);
  const outputCenter = getNeuronCenter(positions.output);

  // Total canvas size
  const canvasWidth =
    layout.padding.left +
    layout.spacing.horizontal +
    layout.neuronSize +
    layout.padding.right;
  const canvasHeight =
    layout.padding.top +
    layout.spacing.vertical +
    layout.neuronSize +
    layout.padding.bottom;

  return (
    <Stack gap="lg">
      {/* Header */}
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <Brain size={28} color="#228be6" />
          <Title order={2}>Perceptron Playground</Title>
        </Group>
        <Badge
          size="lg"
          variant="gradient"
          gradient={{ from: "blue", to: "teal" }}
        >
          Interactive
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Click on neurons to adjust inputs and bias. Hover over connection lines
        to adjust weights. Watch the liquid fill animation respond in real-time!
      </Text>

      {/* Main Playground */}
      <Paper
        shadow="xl"
        p="xl"
        radius="lg"
        style={{
          backgroundColor: "#1a1b1e",
          border: "1px solid #373a40",
          overflow: "visible",
        }}
      >
        <Box
          style={{
            position: "relative",
            width: canvasWidth,
            height: canvasHeight,
            margin: "0 auto",
          }}
        >
          {/* Connection Lines Layer */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {/* Placeholder for lines - using absolute positioned divs instead */}
          </svg>

          {/* Connections using absolute positioning */}
          <Connection
            from={input1Center}
            to={outputCenter}
            weight={weight1}
            onWeightChange={setWeight1}
            showFlow
            activationStrength={input1}
          />
          <Connection
            from={input2Center}
            to={outputCenter}
            weight={weight2}
            onWeightChange={setWeight2}
            showFlow
            activationStrength={input2}
          />

          {/* Neurons Layer */}
          {/* Input Neuron 1 */}
          <Box
            style={{
              position: "absolute",
              left: positions.input1.x,
              top: positions.input1.y,
              zIndex: 10,
            }}
          >
            <Neuron
              label="Input 1"
              value={input1}
              type="input"
              size={layout.neuronSize}
              showBias={false}
            />
            {/* Input control slider */}
            <Box mt="md" style={{ width: layout.neuronSize }}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={input1}
                onChange={(e) => setInput1(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>
          </Box>

          {/* Input Neuron 2 */}
          <Box
            style={{
              position: "absolute",
              left: positions.input2.x,
              top: positions.input2.y,
              zIndex: 10,
            }}
          >
            <Neuron
              label="Input 2"
              value={input2}
              type="input"
              size={layout.neuronSize}
              showBias={false}
            />
            {/* Input control slider */}
            <Box mt="md" style={{ width: layout.neuronSize }}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={input2}
                onChange={(e) => setInput2(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>
          </Box>

          {/* Output Neuron */}
          <Box
            style={{
              position: "absolute",
              left: positions.output.x,
              top: positions.output.y,
              zIndex: 10,
            }}
          >
            <Neuron
              label="Output"
              value={finalOutput}
              type="output"
              size={layout.neuronSize}
              showBias
              bias={bias}
              onBiasChange={setBias}
            />
          </Box>
        </Box>
      </Paper>

      {/* Controls */}
      <Paper p="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={600}>Activation Function</Text>
            <SegmentedControl
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
          </Group>

          {/* Output Information */}
          <Box
            p="sm"
            style={{
              backgroundColor: "#25262b",
              borderRadius: 8,
              border: "1px solid #373a40",
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Weighted Sum:
                </Text>
                <Text size="sm" fw={700} ff="monospace" c="blue">
                  {weightedSum.toFixed(4)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Final Output:
                </Text>
                <Text size="lg" fw={700} ff="monospace" c="teal">
                  {finalOutput.toFixed(4)}
                </Text>
              </Group>
              <Text size="xs" c="dimmed" ta="center" mt="xs">
                ({input1.toFixed(2)} × {weight1.toFixed(2)}) + (
                {input2.toFixed(2)} × {weight2.toFixed(2)}) + {bias.toFixed(2)}{" "}
                = {weightedSum.toFixed(2)}
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
