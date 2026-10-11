export function effectiveAudioGain({enabled,unlocked,visible,mediaOwners=0}){return enabled&&unlocked&&visible&&mediaOwners===0?.35:0;}
