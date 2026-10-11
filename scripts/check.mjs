import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..'),site=path.join(root,'_site');
const data=JSON.parse(await fs.readFile(path.join(site,'articles.json'),'utf8'));
assert.ok(data.length>=5,'Expected all five initial sources');
for(const id of ['paper-2406','paper-2503','normalization','trifecta','statements'])assert.ok(data.some(a=>a.id===id),`Missing initial source ${id}`);
assert.equal(new Set(data.map(a=>a.id)).size,data.length);
for(const a of data){
 assert.ok(a.quote.text.trim().split(/\s+/).length<=25,`${a.id}: quote exceeds 25 words`);
 assert.ok(a.references.length>0);
 if(a.figure)await fs.access(path.join(site,a.figure.path));
 const html=await fs.readFile(path.join(site,a.id+'.html'),'utf8');
 for(const takeaway of a.takeaways)assert.ok(html.includes(takeaway.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))));
}
let links=0;
for(const filename of (await fs.readdir(site)).filter(f=>f.endsWith('.html'))){
 const html=await fs.readFile(path.join(site,filename),'utf8');
 assert.ok(/<html lang="en">/.test(html));assert.ok(/name="viewport"/.test(html));assert.ok(/id="main"/.test(html));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${filename}: duplicate IDs`);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=m[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|data:)/.test(href))continue;
  const url=new URL(href,'https://test.local/researchx/'+filename);const target=decodeURIComponent(url.pathname.replace(/^\/researchx\//,''))||'index.html';
  await fs.access(path.join(site,target));
  if(url.hash&&target.endsWith('.html')){const content=await fs.readFile(path.join(site,target),'utf8');assert.ok(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${filename}: broken anchor ${href}`);}
  links++;
 }
 assert.ok(!/TODO|undefined|\[object Object\]/.test(html),`${filename}: unresolved content`);
}
assert.ok((await fs.readdir(site)).includes('browse.html'));
const rows=data.find(a=>a.id==='paper-2406').interaction.data;
assert.equal(rows.length,5);assert.equal(rows[0].targetedASR,57.69);assert.equal(rows[4].targetedASR,6.84);
for(const r of rows)for(const metric of ['benignUtility','utilityUnderAttack','targetedASR'])assert.ok(r[metric]>=0&&r[metric]<=100&&r.ci95[metric]>0);
console.log(`Checked ${data.length} sources, ${(await fs.readdir(site)).filter(f=>f.endsWith('.html')).length} pages, ${links} local links, quote lengths, figure assets and measured chart data.`);
