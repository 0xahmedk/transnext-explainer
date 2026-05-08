import {
  Box,
  Text,
  Progress as MantineProgress,
  Stack,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { CheckCircle, Circle, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  title: string;
  subtitle: string;
}

const sections: Section[] = [
  {
    id: "section-0",
    title: "The Evolution of Vision",
    subtitle: "Standard ViT & Global Attention",
  },
  {
    id: "section-2",
    title: "The TransNeXt Breakthrough",
    subtitle: "Aggregated Attention & Foveal Lens",
  },
  {
    id: "section-3",
    title: "ConvGLU: Spatial Gate",
    subtitle: "Depth-wise Conv meets Gated Linear Units",
  },
];

export function ProgressNavigation() {
  const [activeSection, setActiveSection] = useState<string>("section-0");
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          setProgress(((i + 1) / sections.length) * 100);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: 80,
        right: isMinimized ? -140 : 40,
        zIndex: 100,
        width: 280,
        transition: "right 0.3s ease",
      }}
      visibleFrom="lg"
      hiddenFrom="base"
    >
      <ActionIcon
        variant="filled"
        size="lg"
        color="dark"
        style={{
          position: "absolute",
          left: -20,
          top: 13,
          borderRadius: "50%",
          border: "1px solid #2a2a2e",
        }}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </ActionIcon>

      <Box
        p="lg"
        style={{
          backgroundColor: "#141417",
          border: "1px solid #2a2a2e",
          borderRadius: 12,
        }}
      >
        <AnimatePresence>
          {!isMinimized ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Group justify="space-between" mb="xs">
                <Text
                  size="sm"
                  fw={600}
                  style={{ color: "#707070", letterSpacing: "0.06em" }}
                >
                  YOUR JOURNEY
                </Text>
                <Text
                  size="xs"
                  fw={700}
                  style={{
                    color: "#e8a020",
                    background: "rgba(232, 160, 32, 0.1)",
                    border: "1px solid rgba(232, 160, 32, 0.25)",
                    padding: "1px 8px",
                    borderRadius: 10,
                    fontFamily: "monospace",
                  }}
                >
                  {Math.round(progress)}%
                </Text>
              </Group>

              <MantineProgress
                value={progress}
                size="sm"
                mb="lg"
                styles={{
                  section: { backgroundColor: "#e8a020" },
                  root: { backgroundColor: "#2a2a2e" },
                }}
              />

              <Stack gap="md">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  const isPassed =
                    sections.findIndex((s) => s.id === activeSection) > index;

                  return (
                    <motion.div
                      key={section.id}
                      whileHover={{ x: 4 }}
                      style={{ cursor: "pointer" }}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <Group gap="sm" wrap="nowrap">
                        <Box style={{ flexShrink: 0 }}>
                          {isPassed ? (
                            <CheckCircle size={20} color="#22c55e" />
                          ) : (
                            <Circle
                              size={20}
                              color={isActive ? "#e8a020" : "#3a3a40"}
                              fill={isActive ? "#e8a020" : "transparent"}
                            />
                          )}
                        </Box>
                        <Box style={{ flex: 1 }}>
                          <Text
                            size="sm"
                            fw={600}
                            style={{
                              color: isActive
                                ? "#e8a020"
                                : isPassed
                                  ? "#22c55e"
                                  : "#707070",
                            }}
                          >
                            {section.title}
                          </Text>
                          <Text
                            size="xs"
                            lineClamp={1}
                            style={{ color: isActive ? "#c0c0c0" : "#555" }}
                          >
                            {section.subtitle}
                          </Text>
                        </Box>
                      </Group>
                    </motion.div>
                  );
                })}
              </Stack>
            </motion.div>
          ) : (
            <Text size="sm" fw={600} style={{ color: "#707070" }}>
              YOUR JOURNEY
            </Text>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
