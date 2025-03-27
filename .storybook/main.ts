import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: (head) => `${head}
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&display=swap" rel="stylesheet">
`,
};
export default config;
