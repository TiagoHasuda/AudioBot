import { CacheType, Interaction } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export function resume(interaction: Interaction<CacheType>): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.resume()
  if (interaction.isButton())
    interaction.deferUpdate()
}