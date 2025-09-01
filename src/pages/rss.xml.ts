import { getCollection } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import mdxRenderer from '@astrojs/mdx/server.js';

export async function GET(context) {
  const site = context.site ?? 'https://twistinside.com';
  const articles = await getCollection('articles');

  const container = await experimental_AstroContainer.create();
  container.addServerRenderer({ renderer: mdxRenderer });

  const items = await Promise.all(
    articles
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(async (article) => {
        const url = new URL(`/articles/${article.slug}/`, site);

        const { Content } = await article.render();
        const html = await container.renderToString(Content);

        return `    <item>\n` +
          `      <title><![CDATA[${article.data.title}]]></title>\n` +
          `      <description><![CDATA[${article.data.description}]]></description>\n` +
          `      <link>${url}</link>\n` +
          `      <guid>${url}</guid>\n` +
          `      <pubDate>${article.data.date.toUTCString()}</pubDate>\n` +
          `      <content:encoded><![CDATA[${html}]]></content:encoded>\n` +
          `    </item>`;
      })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
    `  <channel>\n` +
    `    <title>Twistinside</title>\n` +
    `    <description>Latest articles from Twistinside</description>\n` +
    `    <link>${site}</link>\n` +
    `    ${items.join("\n")}\n` +
    `  </channel>\n` +
    `</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

