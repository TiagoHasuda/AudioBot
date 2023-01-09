import { AudioPlayerSingleton } from "../audioplayer";

export function stop(): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.stop()
}