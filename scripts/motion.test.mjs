import test from 'node:test';import assert from 'node:assert/strict';import {readingPresentation,pickFocus} from './motion.mjs';
test('reading focus is continuous, bounded, symmetric and respects reduced motion',()=>{
 assert.deepEqual(readingPresentation(0),{scale:1,opacity:1,shift:0});
 for(let p=-2;p<=2;p+=.025){const m=readingPresentation(p);assert.ok(m.opacity>=.35&&m.opacity<=1);assert.ok(m.scale>=.955&&m.scale<=1);assert.ok(Math.abs(m.opacity-readingPresentation(-p).opacity)<1e-9);assert.ok(Math.abs(m.opacity-readingPresentation(p+.001).opacity)<.003);}
 assert.deepEqual(readingPresentation(.75,true),{scale:1,opacity:1,shift:0});
});
test('focus hysteresis prevents ticks from chattering between adjacent articles',()=>{
 assert.equal(pickFocus([.31,-.29],0),0);assert.equal(pickFocus([.34,-.26],0),1);assert.equal(pickFocus([.29,-.31],1),1);assert.equal(pickFocus([.25,-.35],1),0);assert.equal(pickFocus([],0),-1);assert.equal(pickFocus([.4,-.1],-1),1);
});
