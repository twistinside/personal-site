export function getArticleSlug(article: { id: string; slug?: string }) {
  return (article.slug ?? article.id).replace(/\.mdx?$/, '');
}
