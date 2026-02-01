import {
  Box,
  Container,
  Title,
  Text,
  Stack,
  Paper,
  Code,
  List,
} from "@mantine/core";
import { Sparkles, Brain } from "lucide-react";

/**
 * Hero/Introduction Section
 *
 * Sets the tone for the Percept educational journey.
 */
export function IntroductionSection() {
  return (
    <Box
      component="section"
      py={100}
      style={{
        borderBottom: "1px solid #373a40",
        background: "linear-gradient(180deg, #1a1b1e 0%, #141517 100%)",
      }}
    >
      <Container size="md">
        <Stack gap="xl" align="center">
          {/* Icon */}
          <Box
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #228be6 0%, #12b886 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={40} color="white" />
          </Box>

          {/* Main Title */}
          <Stack gap="md" align="center">
            <Title
              order={1}
              size={48}
              ta="center"
              style={{
                background: "linear-gradient(135deg, #228be6 0%, #12b886 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome to the Lab
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              An interactive journey from a single neuron to a screaming cat
              detector
            </Text>
          </Stack>

          {/* Introduction Text */}
          <Paper
            p="xl"
            radius="lg"
            style={{
              backgroundColor: "#1a1b1e",
              border: "1px solid #373a40",
              maxWidth: 700,
            }}
          >
            <Stack gap="lg">
              <Box>
                <Text size="lg" mb="md">
                  In 1958, Frank Rosenblatt invented the <Code>Perceptron</Code>{" "}
                  — the first artificial neuron that could learn. Today, we're
                  going to build one from scratch.
                </Text>
                <Text size="md" c="dimmed">
                  But here's the twist: we're not just going to <em>read</em>{" "}
                  about it. We're going to <strong>feel</strong> it. Touch it.
                  Break it. Watch it learn.
                </Text>
              </Box>

              <Box
                p="md"
                style={{
                  backgroundColor: "#25262b",
                  borderRadius: 8,
                  borderLeft: "3px solid #228be6",
                }}
              >
                <Stack gap="xs">
                  <Box
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Sparkles size={16} color="#228be6" />
                    <Text size="sm" fw={600}>
                      What you'll learn:
                    </Text>
                  </Box>
                  <List size="sm" spacing="xs" c="dimmed">
                    <List.Item>
                      How a single neuron makes decisions using{" "}
                      <Code>weights</Code> and <Code>bias</Code>
                    </List.Item>
                    <List.Item>
                      Why neural networks are just fancy "tuning knobs" for
                      pattern matching
                    </List.Item>
                    <List.Item>
                      The magic moment when neurons stack together to detect
                      cats (or anything else)
                    </List.Item>
                    <List.Item>
                      How to build your own perceptron from mathematical first
                      principles
                    </List.Item>
                  </List>
                </Stack>
              </Box>

              <Text size="sm" c="dimmed" ta="center" fs="italic">
                Scroll down to begin. Each stage builds on the last. Take your
                time. Experiment. There are no wrong moves in the lab.
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
