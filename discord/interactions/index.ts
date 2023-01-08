import { CacheType, Interaction, Message } from "discord.js";
import { play } from "./play";

const interactions: {[key: string]: (content: string, interaction: Interaction<CacheType>) => void} = {
  'play': play
}

export function handleInteraction(command: string, content: string, interaction: Interaction<CacheType>): void {
  if (!Object.keys(interactions).includes(command))
    return
  interactions[command](content, interaction)
}
