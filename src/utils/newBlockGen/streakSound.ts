import * as Tone from "tone";
export const streakSound = (streak: React.MutableRefObject<number>) => {
  const synth = new Tone.Synth().toDestination();
  streak.current += 1;
  switch (streak.current) {
    case 1:
      synth.triggerAttackRelease("C4", "8n");
      break;
    case 2:
      synth.triggerAttackRelease("D4", "8n");
      break;
    case 3:
      synth.triggerAttackRelease("E4", "8n");
      break;
    case 4:
      synth.triggerAttackRelease("F4", "8n");
      break;
    case 5:
      synth.triggerAttackRelease("G4", "8n");
      break;
    case 6:
      synth.triggerAttackRelease("A4", "8n");
      break;
    case 7:
      synth.triggerAttackRelease("B4", "8n");
      break;
    case 8:
      synth.triggerAttackRelease("C5", "8n");
      break;
    case 9:
      synth.triggerAttackRelease("D5", "8n");
      break;
    case 10:
      synth.triggerAttackRelease("E5", "8n");
      break;
    case 11:
      synth.triggerAttackRelease("F5", "8n");
      break;
    case 12:
      synth.triggerAttackRelease("G5", "8n");
      break;
    case 13:
      synth.triggerAttackRelease("A5", "8n");
      break;
    case 14:
      synth.triggerAttackRelease("B5", "8n");
      break;
    case 15:
      synth.triggerAttackRelease("C6", "8n");
      break;
    case 16:
      synth.triggerAttackRelease("C8", "16n");
      break;
    default:
      break;
  }
};
