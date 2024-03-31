import { Telegraf } from 'telegraf'
import { PrismaClient } from '@prisma/client'

import { Action } from './actions.class'
import { IBotContext } from '../context/context.interface'
import { UserRepository } from '../user/user.repository'
import { Keyboards } from '../keyboards/keyboards'
import { Wallet } from '../wallet/wallet'

export class GetAction extends Action {
	userRepository: UserRepository
	keyboards: Keyboards
	wallet: Wallet

	constructor(bot: Telegraf<IBotContext>) {
		super(bot)

		this.userRepository = new UserRepository(new PrismaClient())
		this.keyboards = new Keyboards()
		this.wallet = new Wallet()
	}

	handle(): void {
		this.bot.action('get', async (context) => {
			try {
				const userId = context.from.id
				const user = await this.userRepository.findById(userId)

				if (user) {
					const mnemonics = user.mnemonics
				
					const address = await this.wallet.getAddress(mnemonics)

					return await context.replyWithHTML(`Ваш адрес для получения <b>TonCoin</b>, не забудьте указать сеть <b>TON</b>\n${address.toString()}`)
				}
			} catch (error) {
				console.error('failed to get', error)

				throw error
			}
		})
	}
}
