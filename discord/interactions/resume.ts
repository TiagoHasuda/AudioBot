import { AudioPlayerSingleton } from "../audioplayer";

export function resume(): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.resume()
}