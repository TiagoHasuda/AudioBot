import { joinVoiceChannel } from "@discordjs/voice";
import { CacheType, Interaction, InternalDiscordGatewayAdapterCreator } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export async function reset(_: string, interaction: Interaction<CacheType>) {
  const player = AudioPlayerSingleton.getAudioPlayer()
  await player.disconnect(interaction.client)
  const connection = joinVoiceChannel({
    channelId: interaction.channelId as string,
    guildId: interaction.guildId as string,
    adapterCreator: interaction.guild?.voiceAdapterCreator as InternalDiscordGatewayAdapterCreator,
  })
  player.subscribe(connection)
}