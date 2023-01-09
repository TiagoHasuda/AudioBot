import { CacheType, Interaction } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export function pause(interaction: Interaction<CacheType>): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.pause()
  if (interaction.isButton())
    interaction.deferUpdate()
}