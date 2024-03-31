import { Telegraf } from 'telegraf'
import { PrismaClient } from '@prisma/client'

import { Command } from './commands.class'
import { IBotContext } from '../context/context.interface'
import { CreateUserDto } from '../user/dto/user.dto'
import { UserRepository } from '../user/user.repository'
import { Keyboards } from '../keyboards/keyboards'
import { Wallet } from '../wallet/wallet'

export class StartCommand extends Command {
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
		this.bot.start(async (context) => {
			try {
				const userId = context.message.from.id
				const user = await this.userRepository.findById(userId)

				if (!user) {
					const [mnemonics, address] = await this.wallet.create()

					const userData: CreateUserDto = {
						userId: userId,
						address: address,
						mnemonics: mnemonics
					}

					await this.userRepository.create(userData)	

					return await context.sendMessage('Вы успешно зарегистрированы', this.keyboards.startMarkup())
				}

				return await context.sendMessage('Вы успешно авторизованы', this.keyboards.startMarkup())
			} catch (error) {
				console.error('failed to start command')

				throw error
			}
		})
	}
}
