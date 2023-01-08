import { AudioPlayerSingleton } from "../audioplayer";

export function stop() {
  AudioPlayerSingleton.getAudioPlayer().stop();
}