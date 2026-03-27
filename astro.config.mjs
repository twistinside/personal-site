import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://twistinsi.de',
  legacy: {
    collectionsBackwardsCompat: true,
  },
  integrations: [ mdx() ],
  markdown: {
    syntaxHighlight: false,
  },
});
