import { CacheType, Interaction } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export function stop(interaction: Interaction<CacheType>): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.stop()
  if (interaction.isButton())
    interaction.deferUpdate()
}