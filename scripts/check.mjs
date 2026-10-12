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
assert.ok(html.includes('class="finx-link" href="finx/"'),'Collection must link to the integrated finance guide');
const finance=path.join(site,'finx'),source=path.join(root,'finx');
const pages=(await fs.readdir(source)).filter(file=>file.endsWith('.html'));
assert.ok(pages.includes('index.html')&&pages.includes('cfa.html'),'Finance index and planner must be included');
for(const file of pages){
 const page=await fs.readFile(path.join(finance,file),'utf8');
 assert.equal(page,await fs.readFile(path.join(source,file),'utf8'),`Finance page changed during build: ${file}`);
 assert.ok(page.includes('href="../"'),`Missing return link in ${file}`);
 for(const [,ref] of page.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=new URL(ref,`https://site.invalid/finx/${file}`);
  if(url.origin!=='https://site.invalid')continue;
  const target=path.join(site,decodeURIComponent(url.pathname));
  await fs.access(target);
  if(url.hash&&target.endsWith('.html')){
   const destination=await fs.readFile(target,'utf8');
   assert.ok(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing anchor ${ref} in ${file}`);
  }
 }
}
for(const file of ['app.js','planner.js','style.css',...(await fs.readdir(path.join(source,'assets'))).map(file=>`assets/${file}`)]){
 assert.deepEqual(await fs.readFile(path.join(finance,file)),await fs.readFile(path.join(source,file)),`Finance asset changed during build: ${file}`);
}
console.log(`Checked ${data.length} original-source links and ${pages.length} integrated finance pages, assets, local links, and return links.`);
