import { getCollection } from 'astro:content';

export async function GET(context) {
  const site = context.site ?? 'https://twistinside.com';
  const articles = await getCollection('articles');
  const items = articles
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((article) => {
      const url = new URL(`/articles/${article.slug}/`, site);
      return `    <item>\n` +
        `      <title><![CDATA[${article.data.title}]]></title>\n` +
        `      <description><![CDATA[${article.data.description}]]></description>\n` +
        `      <link>${url}</link>\n` +
        `      <guid>${url}</guid>\n` +
        `      <pubDate>${article.data.date.toUTCString()}</pubDate>\n` +
        `    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `  <channel>\n` +
    `    <title>Twistinside</title>\n` +
    `    <description>Latest articles from Twistinside</description>\n` +
    `    <link>${site}</link>\n` +
    `    ${items}\n` +
    `  </channel>\n` +
    `</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

