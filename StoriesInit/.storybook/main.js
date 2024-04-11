/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../../client/src/**/*.mdx", // Adjust path to client/src
    "../../client/src/**/*.stories.@(js|jsx|ts|tsx)", // Adjust path to client/src
    "../../client/src/stories/**/*.stories.@(js|jsx|ts|tsx)", // Adjust path to client/src/stories
    "../../client/src/stories/test/test.stories.tsx", // Adjust path to client/src/stories/test
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
