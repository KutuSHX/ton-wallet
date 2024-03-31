import { Markup } from 'telegraf'

export class Keyboards {
  startMarkup() {
    const markup = Markup.inlineKeyboard([
      [
        { text: 'Пополнить➕', callback_data: 'get' },
        { text: '➖Вывести', callback_data: 'send' }
      ],
      [{ text: 'Настройки⚙️', callback_data: 'settings' }]
    ])

    return markup
  }

  settingsMarkup() {
    const markup = Markup.inlineKeyboard([
      [{ text: 'Фраза востановления🤫', callback_data: 'mnemonics' }],
      [
        { text: 'Валюта🪙', callback_data: 'currency' },
        { text: 'Криатовалюта💲', callback_data: 'cryptocurrency' }
      ],
      [{ text: 'Меню', callback_data: 'menu' }]
    ])

    return markup
  }
}