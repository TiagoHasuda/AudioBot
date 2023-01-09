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
  const rows: ButtonBuilder[][][] = [[[]]]
  let message = 0
  let index = 0
  buttons.forEach((btn) => {
    if (rows[message][index].length >= 5) {
      if (rows[message].length >= 3) {
        message++
        index = 0
        rows[message] = [[]]
      } else {
        index++
        rows[index] = []
      }
    }
    rows[message][index].push(btn)
  })
  const promises = rows.map(async line => {
    await msg.channel.send({ content: '', components: line.map((row) => ({ type: ComponentType.ActionRow, components: row })) })
  })
  await Promise.all(promises)
}