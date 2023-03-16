import { CacheType, Interaction, Message } from "discord.js";
import { stop } from "../commands/stop";
import { pause } from "./pause";
import { play } from "./play";
import { reset } from "./reset";
import { resume } from "./resume";

const interactions: {[key: string]: (content: string, interaction: Interaction<CacheType>) => void} = {
  'play': play,
  'resume': resume,
  'pause': pause,
  'stop': stop,
  'reset': reset,
}

export function handleInteraction(command: string, content: string, interaction: Interaction<CacheType>): void {
  if (!Object.keys(interactions).includes(command))
    return
  interactions[command](content, interaction)
}
