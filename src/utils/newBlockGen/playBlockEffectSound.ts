import { Player } from "tone";
import blockEffect1 from "../../assets/audio/blockEffect1.mp3";
import blockEffect2 from "../../assets/audio/blockEffect2.mp3";
import blockEffect3 from "../../assets/audio/blockEffect3.mp3";
import { DistortionType } from "../../types";

export let playBlockEffectSound = (distortion: DistortionType) => {
  let randomSound = Math.floor(Math.random() * Math.floor(3)) + 1;
  let player;

  let url = blockEffect1;
  if (randomSound === 1) {
    url = blockEffect1;
  } else if (randomSound === 2) {
    url = blockEffect2;
  } else if (randomSound === 3) {
    url = blockEffect3;
  }
  player = new Player({
    url: url,
    autostart: true,
  });

  if (player) {
    player.connect(distortion.current);
  }
};
