import type { Preview } from '@storybook/react-vite'
import { OrionProvider } from '../../../packages/ui/src/styles/provider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Design System', ['Introdução', 'Tokens'], 'UI', 'Form', 'Layout'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

  },
  decorators: [
    (Story) => {
      return (
        <OrionProvider>
          <Story />
        </OrionProvider>
      );
    },
  ],

};

export default preview;