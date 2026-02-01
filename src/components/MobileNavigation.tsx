import { Box, Group, Text, Progress, ActionIcon, Drawer } from "@mantine/core";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ProgressNavigation } from "./ProgressNavigation";

/**
 * Mobile Navigation Bar
 *
 * A bottom-fixed progress bar for mobile devices with a drawer menu.
 */
export function MobileNavigation() {
  const [opened, setOpened] = useState(false);
  const [progress] = useState(25); // This would be calculated based on scroll

  return (
    <>
      {/* Mobile Progress Bar */}
      <Box
        hiddenFrom="lg"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#1a1b1e",
          borderTop: "1px solid #373a40",
        }}
      >
        <Progress value={progress} size="xs" color="teal" />
        <Group justify="space-between" p="md">
          <Text size="sm" fw={600}>
            Stage {Math.ceil(progress / 25)} / 4
          </Text>
          <ActionIcon
            variant="subtle"
            onClick={() => setOpened(true)}
            size="lg"
          >
            <Menu size={20} />
          </ActionIcon>
        </Group>
      </Box>

      {/* Navigation Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        size="sm"
        title="Your Journey"
        styles={{
          header: { backgroundColor: "#1a1b1e" },
          body: { backgroundColor: "#1a1b1e" },
        }}
      >
        <ProgressNavigation />
      </Drawer>
    </>
  );
}
