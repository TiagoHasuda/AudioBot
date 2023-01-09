import { AudioPlayerSingleton } from "../audioplayer";

export function pause(): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.pause()
}