import {
  Box,
  Container,
  Text,
  Stack,
  Paper,
  Code,
  List,
  Image,
  Title,
} from "@mantine/core";
import { Sparkles } from "lucide-react";
import percept_logo from "../assets/percept_logo.png";

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
          <Stack gap="xl" align="center" mb={"lg"}>
            <Image
              src={percept_logo}
              alt="Percept It! Logo"
              style={{ width: 100, height: 100 }}
            />

            {/* Main Title */}
            <Title order={1} size={38} ta="center">
              NEURAL NETWORKS
            </Title>
            <Text size="sm" c="dimmed" ta="center">
              by{" "}
              <a
                href="https://www.linkedin.com/in/0xahmedkhan"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#228be6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                Ahmed Khan
              </a>
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
                  In 1958, Frank Rosenblatt invented the Perceptron the first
                  artificial neuron that could learn. This invention bridged the
                  gap between biological inspiration and digital logic, proving
                  that a simple mathematical model could mimic the way human
                  neurons process sensory inputs.
                </Text>
                <Text size="md" mb={"md"}>
                  Today, we're going to build one from scratch, think about your
                  morning coffee. Your 5 senses are the ultimate input sensors:
                  <List>
                    <List.Item>
                      Sight: The steam rising from the mug.{" "}
                    </List.Item>
                    <List.Item>
                      Touch: The warmth of the ceramic against your palm.
                    </List.Item>
                    <List.Item>
                      Smell: That unmistakable roasted aroma.
                    </List.Item>
                    <List.Item>
                      Sound: The gentle clink of the spoon against the mug.
                    </List.Item>
                    <List.Item>
                      Taste: The rich, bitter flavor of the coffee.
                    </List.Item>
                  </List>
                </Text>

                <Text size="md">
                  Your body doesn't just "have" these sensations; it processes
                  them. Millions of biological neurons are firing right now,
                  taking those inputs and "weighted" signals, like how a burning
                  hot mug (High Input) might override the nice smell, and
                  sending a message to your brain: "Drink this now" or "Wait,
                  it's too hot!".
                </Text>
                <Text size="md" mt={"sm"}>
                  Artificial Neural Networks (ANNs) are just a simplified,
                  digital version of this biological masterpiece. We take Inputs
                  (like our senses), multiply them by Weights (how much we care
                  about that sense), and add a Bias (our internal threshold). If
                  the final "Sum" is high enough, the neuron "fires," just like
                  the ones in your head.
                </Text>
                <Text size="md" mt={"sm"}>
                  Experiment 1: Below, you'll see your first digital neuron.
                  It’s set up to act as a Logic Gate. Can you figure out how to
                  make it "fire" using only the inputs provided?
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
