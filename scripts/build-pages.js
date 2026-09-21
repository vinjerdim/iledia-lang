'use strict';

/*
 * build-pages.js — Generates each MPI module's index.html from one shared
 * template (shared/page-template.html) plus a per-module manifest
 * (shared/pages-manifest.json).
 *
 * This is a build-time tool a developer runs by hand before committing
 * ("npm run build:pages") — the site is still deployed as plain static
 * files, with no build step in CI or hosting. Run `prettier --write` on the
 * generated files afterwards as usual (lint-staged already does this on
 * commit).
 *
 * Usage: node scripts/build-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'shared', 'page-template.html');
const MANIFEST_PATH = path.join(ROOT, 'shared', 'pages-manifest.json');

/*
 * Resolves a path that came out of the manifest and refuses anything that
 * escapes the repository. The manifest is checked-in data rather than user
 * input, but this script reads and writes files at paths taken straight
 * from it, so a stray "../" in a key or an extraBody would silently write
 * outside the repo.
 */
function resolveInsideRepo(...segments) {
  const target = path.resolve(ROOT, ...segments);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    throw new Error('Refusing to touch a path outside the repository: ' + target);
  }
  return target;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Re-indents a partial to sit at `indent` inside the template, so the
   generated page comes out of the build already Prettier-clean. */
function indentBlock(text, indent) {
  return text
    .split('\n')
    .map(function (line) {
      return line.trim() === '' ? '' : indent + line;
    })
    .join('\n')
    .trim();
}

function renderPage(template, entry) {
  var extraBody = entry.extraBody
    ? indentBlock(fs.readFileSync(resolveInsideRepo('shared', entry.extraBody), 'utf8'), '    ')
    : '';
  var extraScripts = entry.extraScripts
    ? entry.extraScripts
        .map(function (src) {
          return '<script src="' + escapeHtml(src) + '"></script>';
        })
        .join('\n    ')
    : '';

  return (
    template
      .replace(/\{\{TITLE\}\}/g, escapeHtml(entry.title))
      .replace(/\{\{DESCRIPTION\}\}/g, escapeHtml(entry.description))
      .replace(/\{\{KICKER\}\}/g, escapeHtml(entry.kicker))
      .replace(/\{\{H1\}\}/g, escapeHtml(entry.h1))
      .replace(/\{\{STAGE_COUNT\}\}/g, String(entry.stageCount))
      .replace(/\{\{EXTRA_BODY\}\}/g, extraBody)
      .replace(/\{\{EXTRA_SCRIPTS\}\}/g, extraScripts)
      /* A placeholder that resolved to nothing leaves its indentation
       behind as a whitespace-only line. */
      .replace(/^[ \t]+$/gm, '')
  );
}

function main() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  Object.keys(manifest).forEach(function (modulePath) {
    const html = renderPage(template, manifest[modulePath]);
    const outPath = resolveInsideRepo(modulePath, 'index.html');
    fs.writeFileSync(outPath, html);
    console.log('Generated ' + path.relative(ROOT, outPath));
  });
}

main();
