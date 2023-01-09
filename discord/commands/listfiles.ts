import { ButtonBuilder, ButtonStyle, ComponentType, Message } from "discord.js";
import fs from 'fs'

export async function listfiles(_: string, msg: Message<boolean>) {
  const files = fs.readdirSync('./files')
  const buttons = files.filter(file => file.endsWith('.mp3')).map((file) =>
    new ButtonBuilder()
      .setCustomId(`play_${file}`)
      .setLabel(file)
      .setStyle(ButtonStyle.Primary)
  )
  const rows: ButtonBuilder[][] = []
  let index = 0
  buttons.forEach((btn) => {
    if (rows[index].length >= 5) {
      index++
    }
    rows[index].push(btn)
  })
  await msg.channel.send({ content: 'Files:', components: rows.map((row) => ({ type: ComponentType.ActionRow, components: row })) })
}