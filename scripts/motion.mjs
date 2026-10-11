// A scalar physical spring. Re-targeting preserves the presented value and velocity.
export function springStep(state,target,elapsed,damping=1){
 let {position,velocity}=state;
 let remaining=Math.min(Math.max(elapsed,0),.05);
 while(remaining>0){const dt=Math.min(remaining,1/240);velocity+=(256*(target-position)-32*damping*velocity)*dt;position+=velocity*dt;remaining-=dt;}
 return {position,velocity};
}
export function projectedDetent(position,velocity){
 const rate=.995,projection=(velocity/1000)*rate/(1-rate);
 return Math.round(position+Math.max(-2,Math.min(2,projection)));
}
export const wrapIndex=(index,count)=>((index%count)+count)%count;
