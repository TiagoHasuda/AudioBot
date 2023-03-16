import { Client, Events, Partials } from 'discord.js'
import { AudioPlayerSingleton } from './audioplayer';
import { handleCommand } from './commands';
import { handleInteraction } from './interactions';

const prefix = '$'

let client: Client;

export function InitializeDiscord(): void {
  client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent', 'DirectMessages', 'GuildVoiceStates'],
    partials: [Partials.Channel],
  })

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`)
  })

  client.on('messageCreate', (msg) => {
    if (!msg.content.startsWith(prefix))
      return
    const [command, content] = msg.content.slice(prefix.length).replace(/^([^\\s]+)\\s*(.*)$/, '$1:::$2').split(':::')
    handleCommand(command, content, msg)
  })

  client.on('voiceStateUpdate', async () => {
    const audioPlayer = AudioPlayerSingleton.getAudioPlayer()
    const channelId = audioPlayer.getChannelId()
    if (!channelId)
      return
    const channel = await client.channels.fetch(channelId)
    if (channel?.isVoiceBased() && channel.members.size <= 1) {
      await audioPlayer.disconnect(client)
    }
  })

  client.on(Events.InteractionCreate, (interaction) => {
    const [command, content] = (interaction as any).customId.replace(/^([^_]*)_(.*)$/, '$1:::$2').split(':::')
    console.log({ user: interaction.user.username, content })
    handleInteraction(command, content, interaction)
  })

  client.login(process.env.DISCORD_TOKEN)
}

export function isOnVoiceChat() {
  return client.voice.adapters.size > 0
}