import * as Tone from "tone";
import blockEffect1 from "../../assets/audio/blockEffect1.mp3";
import blockEffect2 from "../../assets/audio/blockEffect2.mp3";
import blockEffect3 from "../../assets/audio/blockEffect3.mp3";
export let playBlockEffectSound = () => {
  let randomSound = Math.floor(Math.random() * Math.floor(3)) + 1;

  let player;
  if (randomSound === 1) {
    player = new Tone.Player({
      url: blockEffect1,
      autostart: true,
    });
  } else if (randomSound === 2) {
    player = new Tone.Player({
      url: blockEffect2,
      autostart: true,
    });
  } else if (randomSound === 3) {
    player = new Tone.Player({
      url: blockEffect3,
      autostart: true,
    });
  }
  let distortion = new Tone.Distortion(0).toDestination();
  if (player) {
    player.connect(distortion);
  }
};
