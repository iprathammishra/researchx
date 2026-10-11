const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
export function readingPresentation(distance,reduced=false){
 if(reduced)return {scale:1,opacity:1,shift:0};
 const proximity=clamp(1-Math.abs(distance)*1.55,0,1);
 const eased=proximity*proximity*(3-2*proximity);
 return {scale:.955+.045*eased,opacity:.35+.65*eased,shift:clamp(distance,-1,1)*-16||0};
}
export function pickFocus(distances,current=-1,hysteresis=.035){
 if(!distances.length)return -1;
 let nearest=0;for(let i=1;i<distances.length;i++)if(Math.abs(distances[i])<Math.abs(distances[nearest]))nearest=i;
 if(current<0||current>=distances.length)return nearest;
 return Math.abs(distances[nearest])+hysteresis<Math.abs(distances[current])?nearest:current;
}
