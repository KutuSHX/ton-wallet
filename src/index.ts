import { Telegraf } from 'telegraf'
import LocalSession from 'telegraf-session-local'

import { Action } from './actions/actions.class'
import { Command } from './commamds/commands.class'
import { StartCommand } from './commamds/start.command'
import { BalanceCommand } from './commamds/balance.commands'
import { MenuAction } from './actions/menu.action' 
import { GetAction } from './actions/get.action'
import { SettingsAction } from './actions/settings.action'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.interface'
import { IBotContext } from './context/context.interface'

class Bot {
  actions: Action[] = []
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor(
    private readonly configService: IConfigService
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.getString('TOKEN'))
    this.bot.use(new LocalSession({ database: 'session.json' }).middleware())
  }

  init() {
    this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Restart bot' },
      { command: 'balance', description: 'Check your balance' }
    ])

    this.actions = [
      new GetAction(this.bot),
      new SettingsAction(this.bot),
      new MenuAction(this.bot)
    ]

    this.commands = [
      new StartCommand(this.bot),
      new BalanceCommand(this.bot)
    ]

    for (const command of this.commands) {
      command.handle()
    }

    for (const action of this.actions) {
      action.handle()
    }

    this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())

bot.init()
