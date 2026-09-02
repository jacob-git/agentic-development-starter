import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['src', 'test', 'scripts'];
const forbidden = [
  { pattern: /console\.log\(/, allow: (path) => path.endsWith('src/server.js') || path.endsWith('scripts/lint.js'), message: 'console.log is only allowed in src/server.js or the lint script' },
  { pattern: /\t/, allow: () => false, message: 'tabs are not allowed' }
];

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.name.endsWith('.js')) files.push(fullPath);
  }
  return files;
}

let failed = false;
for (const root of roots) {
  for (const file of await walk(root)) {
    const text = await readFile(file, 'utf8');
    for (const rule of forbidden) {
      if (rule.pattern.test(text) && !rule.allow(file)) {
        console.error(`${file}: ${rule.message}`);
        failed = true;
      }
    }
  }
}

if (failed) process.exit(1);
console.log('lint: ok');
