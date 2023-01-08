import { CacheType, Interaction } from "discord.js";
import { isOnVoiceChat } from "..";
import { createAudioResource } from '@discordjs/voice'
import { AudioPlayerSingleton } from "../audioplayer";
import fs from 'fs'

function deferUpdate(interaction: Interaction<CacheType>): void {
  if (interaction.isButton())
    interaction.deferUpdate()
}

export function play(content: string, interaction: Interaction<CacheType>): void {
  if (!isOnVoiceChat()) return deferUpdate(interaction)
  const file = `./files/${content}`
  if (!fs.existsSync(file))
    return deferUpdate(interaction)
  const resource = createAudioResource(file, {
    metadata: {
      title: content,
    },
  })
  AudioPlayerSingleton.getAudioPlayer().play(resource)
  if (interaction.isButton())
    interaction.deferUpdate()
}