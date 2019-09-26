import unified from 'unified';
import markdown from 'remark-parse';
// import github from 'remark-github';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

const processor = unified()
  .use(markdown)
  // .use(github)
  .use(remark2rehype)
  .use(html);

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
