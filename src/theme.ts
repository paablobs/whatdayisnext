import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'JetBrains Mono', monospace" },
        body: { value: "'JetBrains Mono', monospace" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
