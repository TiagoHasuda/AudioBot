import { Message } from "discord.js";
import request from 'request'
import fs from 'fs'

export async function newFile(content: string, msg: Message<boolean>) {
  const attachment = msg.attachments.first()
  if (!attachment || !attachment.name?.endsWith('.mp3'))
    return
  await msg.channel.send('Uploading file...')
  request.get(attachment.url)
    .on('complete', async () => {
      await msg.channel.send('File uploaded successfully!')
    })
    .pipe(fs.createWriteStream(`./files/${attachment.name}`))
}
