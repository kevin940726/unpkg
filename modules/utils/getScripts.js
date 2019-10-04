// Virtual module id; see rollup.config.js
// eslint-disable-next-line import/no-unresolved
import entryManifest from 'entry-manifest';

import { createElement } from './markup.js';

function getEntryPoint(name, format) {
  let entryPoints;
  entryManifest.forEach(manifest => {
    if (name in manifest) {
      entryPoints = manifest[name];
    }
  });

  if (entryPoints) {
    return entryPoints.find(e => e.format === format);
  }

  return null;
}

function getGlobalScripts(entryPoint, globalURLs) {
  return entryPoint.globalImports.map(id => {
    if (process.env.NODE_ENV !== 'production') {
      if (!globalURLs[id]) {
        throw new Error('Missing global URL for id "%s"', id);
      }
    }

    return globalURLs[id];
  });
}

const PreloadScript = ({ url }) =>
  createElement('link', { rel: 'preload', as: 'script', href: url });
const Script = ({ url }) => createElement('script', { src: url });

export default function getScripts(entryName, format, globalURLs) {
  const entryPoint = getEntryPoint(entryName, format);

  if (!entryPoint) return [];

  const globalScripts = getGlobalScripts(entryPoint, globalURLs);

  const scripts = globalScripts.concat(entryPoint.url);

  return {
    head: scripts.map(url => createElement(PreloadScript, { url })),
    body: scripts.map(url => createElement(Script, { url }))
  };
}
