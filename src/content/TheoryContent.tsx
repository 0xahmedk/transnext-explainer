import { Text, Stack, Code, List } from "@mantine/core";

export const LogicGatesTheory = () => (
  <Stack gap="md">
    <Text>
      Before we had neural networks, we had something simpler:{" "}
      <strong>logic gates</strong>.
    </Text>

    <Text c="dimmed">
      An <Code>AND</Code> gate takes two inputs (0 or 1) and outputs 1 only if{" "}
      <em>both</em> inputs are 1. An <Code>OR</Code> gate outputs 1 if{" "}
      <em>either</em> input is 1.
    </Text>

    <Text>
      Here's the beautiful insight:{" "}
      <strong>a single Perceptron can learn to be any logic gate</strong>.
    </Text>

    <List size="sm" spacing="sm" c="dimmed">
      <List.Item>
        <strong>Inputs:</strong> Two signals (x₁, x₂) representing 0 or 1
      </List.Item>
      <List.Item>
        <strong>Weights:</strong> Numbers that amplify or reduce each input
      </List.Item>
      <List.Item>
        <strong>Bias:</strong> A threshold that shifts the decision boundary
      </List.Item>
      <List.Item>
        <strong>Output:</strong> A single decision: fire (1) or don't fire (0)
      </List.Item>
    </List>

    <Text size="sm" c="blue" fs="italic">
      Try it yourself: Switch between the AND and OR gate tabs to see how
      changing the bias changes the logic. Can you predict what each gate will
      do before toggling the inputs?
    </Text>
  </Stack>
);

export const WeightsBiasTheory = () => (
  <Stack gap="md">
    <Text>
      Now let's zoom in on the two most important concepts in neural networks:{" "}
      <Code>weights</Code> and <Code>bias</Code>.
    </Text>

    <Text c="dimmed">
      Think of weights as <strong>volume knobs</strong> for each input. A weight
      of 2 means "this input matters twice as much." A weight of -1 means
      "invert this input."
    </Text>

    <Text>
      The bias is your <strong>starting point</strong>. It's like saying: "I'm
      naturally skeptical (negative bias) or naturally optimistic (positive
      bias) before I even see the inputs."
    </Text>

    <Text size="sm" c="dimmed">
      <strong>The Formula:</strong>
    </Text>
    <Code block p="md" style={{ backgroundColor: "#25262b" }}>
      output = activation(w₁·x₁ + w₂·x₂ + bias)
    </Code>

    <Text c="dimmed">
      Where <Code>activation</Code> is a function (like Sigmoid) that squashes
      the result into a range like 0 to 1.
    </Text>

    <Text size="sm" c="blue" fs="italic">
      Experiment: Move the weight sliders along the connection lines. Watch how
      the output neuron fills or drains. Can you make the output always be 0.5?
    </Text>
  </Stack>
);

export const MultiLayerTheory = () => (
  <Stack gap="md">
    <Text>
      One Perceptron is cool. But{" "}
      <strong>multiple Perceptrons working together?</strong> That's when things
      get magical.
    </Text>

    <Text c="dimmed">
      Imagine you're trying to detect a cat in a photo. One neuron might detect
      "pointy ears." Another might detect "whiskers." Another might detect "a
      tail." When all three fire together, you scream:{" "}
      <strong>"THAT'S A CAT!"</strong>
    </Text>

    <Text>
      This is the birth of <Code>hidden layers</Code> — neurons that sit between
      the inputs and the output, learning to recognize increasingly complex
      patterns.
    </Text>

    <List size="sm" spacing="sm" c="dimmed">
      <List.Item>
        <strong>Layer 1 (Input):</strong> Raw pixel values
      </List.Item>
      <List.Item>
        <strong>Layer 2 (Hidden):</strong> Edge detectors, shape recognizers
      </List.Item>
      <List.Item>
        <strong>Layer 3 (Output):</strong> "Is this a cat? YES/NO"
      </List.Item>
    </List>

    <Text size="sm" c="blue" fs="italic">
      Watch how the hidden neurons combine inputs in clever ways. Each hidden
      neuron is learning a different "feature" of the problem.
    </Text>
  </Stack>
);

export const SandboxTheory = () => (
  <Stack gap="md">
    <Text>
      You've made it to the final stage: <strong>The Sandbox</strong>.
    </Text>

    <Text c="dimmed">This is your playground. You now understand:</Text>

    <List size="sm" spacing="sm" c="dimmed">
      <List.Item>
        How a single neuron makes binary decisions (logic gates)
      </List.Item>
      <List.Item>How weights and bias let you tune those decisions</List.Item>
      <List.Item>
        How multiple layers create "feature detectors" for complex patterns
      </List.Item>
    </List>

    <Text>
      Now it's time to build your own network from scratch. Choose your
      architecture. Set your activation functions. Train it on any problem you
      can dream up.
    </Text>

    <Text size="sm" c="teal" fw={600}>
      This is where Frank Rosenblatt's dream becomes yours. Welcome to the lab.
      🧠
    </Text>
  </Stack>
);
