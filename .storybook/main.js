const COMPONENTS = [
  "Base",
  "Button",
  "EpisodePreview",
  "ShowPreview",
  "TextElement",
  "AppShell",
  "SectionHeader",
  "ProgressLine",
];

const CONTAINERS = [
  "BrowseShows",
  "FavouritesList",
  "FeatureShows",
  "SingleShow",
];

const config = {
  stories: [
    "../src/view/components/**/*.stories.jsx",
    "../src/view/containers/**/*.stories.jsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
};
export default config;
