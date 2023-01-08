import { joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { AudioPlayerSingleton } from "../audioplayer";

export async function connect(content: string, msg: Message<boolean>) {
  if (!msg.member || !msg.member.voice.channelId)
    return
  const connection = joinVoiceChannel({
    channelId: msg.member.voice.channelId,
    guildId: msg.member.guild.id,
    adapterCreator: msg.member.guild.voiceAdapterCreator,
  })
  AudioPlayerSingleton.getAudioPlayer().subscribe(connection)
}