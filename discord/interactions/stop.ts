import { CacheType, Interaction } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export function stop(_: string, interaction: Interaction<CacheType>): void {
  const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
  audioPlayer.stop()
  if (interaction.isButton())
    interaction.deferUpdate()
}