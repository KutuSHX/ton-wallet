import { Context } from 'telegraf'

interface SessionData {
  userId: number
  wallet: string
}

export class IBotContext extends Context {
  session: SessionData
}
