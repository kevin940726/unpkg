import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import sanitize from 'rehype-sanitize';

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)
  .use(sanitize);

async function getMarkdownHTML(content) {
  try {
    const file = await processor.process(content);

    return String(file);
  } catch (err) {
    console.error(err);
    return '';
  }
}

export default getMarkdownHTML;
