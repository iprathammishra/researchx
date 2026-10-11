import test from 'node:test';
import assert from 'node:assert/strict';
import {springStep,projectedDetent,wrapIndex} from './motion.mjs';
test('spring settles after reversing in motion without a discontinuous position',()=>{
 let s={position:0,velocity:0};
 for(let i=0;i<12;i++)s=springStep(s,1,1/60);
 const before=s.position;s=springStep(s,-1,1/60);
 assert.ok(Math.abs(s.position-before)<.2);
 for(let i=0;i<180;i++)s=springStep(s,-1,1/60);
 assert.ok(Math.abs(s.position+1)<.001);assert.ok(Math.abs(s.velocity)<.001);
});
test('momentum projects with direction and circular selection wraps both ways',()=>{
 assert.ok(projectedDetent(0,6)>0);assert.ok(projectedDetent(0,-6)<0);
 assert.equal(wrapIndex(-1,5),4);assert.equal(wrapIndex(5,5),0);
});
