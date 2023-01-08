import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Message } from "discord.js";
import fs from 'fs'

export async function listfiles(content: string, msg: Message<boolean>) {
  const files = fs.readdirSync('./files')
  const buttons = files.map((file) =>
    new ButtonBuilder()
      .setCustomId(`play_${file}`)
      .setLabel(file)
      .setStyle(ButtonStyle.Primary)
  )
  await msg.channel.send({ content: 'Files:', components: [{ type: ComponentType.ActionRow, components: buttons }] })
}