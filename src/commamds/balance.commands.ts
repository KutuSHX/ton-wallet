import { Telegraf } from 'telegraf'
import { PrismaClient } from '@prisma/client'

import { Command } from './commands.class'
import { IBotContext } from '../context/context.interface'
import { UserRepository } from '../user/user.repository'
import { Wallet } from '../wallet/wallet'

export class BalanceCommand extends Command {
  userRepository: UserRepository
  wallet: Wallet

  constructor(bot: Telegraf<IBotContext>) {
    super(bot)

    this.userRepository = new UserRepository(new PrismaClient())
    this.wallet = new Wallet()
  }

  handle(): void {
    this.bot.command('balance', async (context) => {
      try {
        const userId = context.message.from.id
        const user = await this.userRepository.findById(userId)
        
        if (!user) {
          return context.sendMessage('Вас нету в базе')
        }

        const balance = await this.wallet.getBalance(user.mnemonics)

        return context.sendMessage(`Ваш баланс: ${balance}`)
      } catch (error) {
        console.error('failed to get balance', error)

        throw error
      }
    })
  }
}

