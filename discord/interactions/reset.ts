import { joinVoiceChannel } from "@discordjs/voice";
import { CacheType, GuildMember, Interaction, InternalDiscordGatewayAdapterCreator } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export async function reset(_: string, interaction: Interaction<CacheType>) {
  const player = AudioPlayerSingleton.getAudioPlayer()
  await player.disconnect(interaction.client)
  console.log({ channelId: (interaction.member as GuildMember).voice.channelId, guildId: interaction.guild?.id, voiceAdapterCreator: interaction.guild?.voiceAdapterCreator })
  const connection = joinVoiceChannel({
    channelId: (interaction.member as GuildMember).voice.channelId as string,
    guildId: interaction.guild?.id as string,
    adapterCreator: interaction.guild?.voiceAdapterCreator as InternalDiscordGatewayAdapterCreator,
  })
  player.subscribe(connection)
  if (interaction.isButton())
    interaction.deferUpdate()
}