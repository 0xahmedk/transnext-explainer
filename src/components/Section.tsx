import {
  Box,
  Container,
  Title,
  Text,
  Stack,
  Grid,
  Paper,
  Divider,
} from "@mantine/core";
import type { ReactNode } from "react";
import { Zap } from "lucide-react";

interface SectionProps {
  id: string;
  stage: string;
  title: string;
  subtitle: string;
  theory: ReactNode;
  playground: ReactNode;
  layout?: "horizontal" | "vertical";
}

export function Section({
  id,
  stage,
  title,
  subtitle,
  theory,
  playground,
  layout = "horizontal",
}: SectionProps) {
  return (
    <Box
      id={id}
      component="section"
      py={80}
      style={{
        minHeight: "100vh",
        borderBottom: "1px solid #2a2a2e",
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          {/* Section Header */}
          <Box>
            <Text
              size="sm"
              fw={600}
              mb="xs"
              tt="uppercase"
              style={{ color: "#e8a020", letterSpacing: "0.08em" }}
            >
              {stage}
            </Text>
            <Title
              order={2}
              mb="xs"
              style={{ color: "#ffffff", fontWeight: 700 }}
            >
              {title}
            </Title>
            <Text size="lg" style={{ color: "#a0a0a0" }}>
              {subtitle}
            </Text>
          </Box>

          {layout === "vertical" ? (
            <Stack gap="xl">
              <Paper
                p={{ base: "md", sm: "xl" }}
                radius="lg"
                style={{
                  backgroundColor: "#141417",
                  border: "1px solid #2a2a2e",
                }}
              >
                <Stack gap="lg">
                  <Box
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Zap size={18} color="#e8a020" />
                    <Text fw={600} size="md" c="white">
                      Intuition
                    </Text>
                  </Box>
                  <Divider color="#2a2a2e" />
                  <Box>{theory}</Box>
                </Stack>
              </Paper>
              <Box>{playground}</Box>
            </Stack>
          ) : (
            <Grid gutter={{ base: "md", sm: "xl" }}>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p={{ base: "md", sm: "xl" }}
                  radius="lg"
                  style={{
                    backgroundColor: "#141417",
                    border: "1px solid #2a2a2e",
                    height: "100%",
                  }}
                >
                  <Stack gap="lg">
                    <Box
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Zap size={18} color="#e8a020" />
                      <Text fw={600} size="md" c="white">
                        Intuition
                      </Text>
                    </Box>
                    <Divider color="#2a2a2e" />
                    <Box>{theory}</Box>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box style={{ position: "sticky", top: 100 }} visibleFrom="md">
                  {playground}
                </Box>
                <Box hiddenFrom="md">{playground}</Box>
              </Grid.Col>
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
