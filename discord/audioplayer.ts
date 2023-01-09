import { AudioPlayer, AudioResource, createAudioPlayer, NoSubscriberBehavior, VoiceConnection } from "@discordjs/voice"
import { Client } from "discord.js"

export class AudioPlayerSingleton {
  private static instance: AudioPlayerSingleton
  private player: AudioPlayer
  private channelId?: string | null

  private constructor() {
    this.player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    })
  }

  static getAudioPlayer(): AudioPlayerSingleton {
    if (!this.instance)
      this.instance = new AudioPlayerSingleton()
    return this.instance
  }

  subscribe(connection: VoiceConnection): void {
    if (!this.player)
      return
    connection.subscribe(this.player)
    this.channelId = connection.joinConfig.channelId
  }

  play(resource: AudioResource): void {
    if (!this.player)
      return
    this.player.play(resource)
  }

  resume(): void {
    if (!this.player)
      return
    this.player.unpause()
  }

  stop(force?: boolean): void {
    if (!this.player)
      return
    this.player.stop(force)
  }

  pause(interpolateSilence?: boolean): void {
    if (!this.player)
      return
    this.player.pause(interpolateSilence)
  }

  async disconnect(client: Client): Promise<void> {
    if (!this.channelId)
      return
    const channel = await client.channels.fetch(this.channelId)
    if (!channel)
      return
    if (!channel.isVoiceBased())
      return
    channel.members.forEach((member) => {
      if (member.id === process.env.BOT_ID) {
        member.voice.disconnect()
        this.stop()
      }
    })
  }

  getChannelId(): undefined | string | null {
    return this.channelId
  }
}