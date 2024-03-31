import { Telegraf } from 'telegraf'

import { Action } from './actions.class'
import { IBotContext } from '../context/context.interface'
import { Keyboards } from '../keyboards/keyboards'

export class MenuAction extends Action {
  keyboards: Keyboards
  
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)

    this.keyboards = new Keyboards()
  }
  
  handle(): void {
    this.bot.action('menu', async (context) => {
      context.replyWithHTML('<b>Меню настроек кошелька</b>', this.keyboards.startMarkup())
    })
  }
}