"use strict";
// Estimate reading time from prose and tables; exercises may take longer.
const reading = document.querySelector('#reading-time');
if (reading) {
  const copy = document.querySelector('main').cloneNode(true);
  copy.querySelectorAll('form,.controls,.meta,figure').forEach(node => node.remove());
  const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
  const parts = [];
  while (walker.nextNode()) parts.push(walker.currentNode.textContent);
  const words = parts.join(' ').trim().split(/\s+/).length;
  reading.textContent = `${Math.max(1, Math.ceil(words / 220))} min read`;
}
