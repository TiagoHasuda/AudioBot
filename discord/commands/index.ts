import { Message } from "discord.js";
import { connect } from "./connect";
import { listfiles } from "./listfiles";
import { newFile } from "./newFile";
import { stop } from "./stop";

const commands: {[key: string]: (content: string, msg: Message<boolean>) => void} = {
  'newfile': newFile,
  'listfiles': listfiles,
  'connect': connect,
  'stop': stop,
}

export function handleCommand(command: string, content: string, msg: Message<boolean>): void {
  if (Object.keys(commands).includes(command))
    commands[command](content, msg)
}
