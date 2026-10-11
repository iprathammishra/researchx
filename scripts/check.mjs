import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),site=path.join(root,'_site');
const data=JSON.parse(await fs.readFile(path.join(site,'articles.json'),'utf8'));
for(const id of ['paper-2406','paper-2503','normalization','trifecta','statements'])assert.ok(data.some(a=>a.id===id),`Missing source ${id}`);
assert.equal(new Set(data.map(a=>a.id)).size,data.length);
const html=await fs.readFile(path.join(site,'index.html'),'utf8');const e=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const a of data){assert.ok(html.includes(e(a.originalTitle)));assert.ok(html.includes(`href="${e(a.source)}"`));assert.ok(/^https:\/\//.test(a.source));}
assert.equal([...html.matchAll(/class="reading-entry"/g)].length,data.length);
assert.ok(!/reading-knob|dial-rotor|site-header|site-footer|Read this idea/.test(html));
assert.equal((await fs.readdir(site)).filter(f=>f.endsWith('.html')).length,2,'Only the reading collection and its existing browse alias should be generated');
for(const filename of ['app.js','audio.js','motion.mjs','search.mjs','audio-state.mjs','style.css','assets/mark.svg'])await fs.access(path.join(site,filename));
assert.equal(await fs.readFile(path.join(site,'browse.html'),'utf8'),html);
console.log(`Checked ${data.length} full titles and direct original links; no simplified detail pages or dial UI.`);
