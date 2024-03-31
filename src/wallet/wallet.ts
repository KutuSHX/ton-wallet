import { getHttpEndpoint } from '@orbs-network/ton-access'
import {
	mnemonicNew,
	mnemonicToPrivateKey,
	mnemonicToWalletKey,
} from '@ton/crypto'
import { TonClient, WalletContractV4 } from '@ton/ton'

export class Wallet {
	private client: TonClient

	constructor() {
		this.client = new TonClient({
			endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
		})
	}

	async create(): Promise<[string[], string]> {
		try {
			const mnemonics = await mnemonicNew()

			if (!mnemonics) {
				throw new Error('failed to generate mnemonics')
			}

			const keyPair = await mnemonicToPrivateKey(mnemonics)

			if (!keyPair) {
				throw new Error('failed to derive key pair from mnemonics')
			}

			const wallet = WalletContractV4.create({
				workchain: 0,
				publicKey: keyPair.publicKey,
			})

			if (!wallet || !wallet.address) {
				throw new Error('failed to create wallet')
			}

			const address = wallet.address.toString()

			return [mnemonics, address]
		} catch (error) {
			console.error('error in create function', error)

			throw error
		}
	}

	async getAddress(mnemonics: string[]): Promise<string> {
		try {
			const keyPair = await mnemonicToWalletKey(mnemonics)
			const wallet = WalletContractV4.create({
				publicKey: keyPair.publicKey,
				workchain: 0
			})

			const balance = wallet.address.toString()

			return balance
		} catch (error) {
			console.error('failed to get address', error)

			throw error
		}
	}

	async getBalance(mnemonics: string[]): Promise<any> {
		try {
			console.log(mnemonics)
			const keyPair = await mnemonicToWalletKey(mnemonics)
			const wallet = WalletContractV4.create({
				publicKey: keyPair.publicKey,
				workchain: 0,	
			})

			const address = await this.client.getBalance(wallet.address)

			return address.toString()
		} catch (error) {
			console.error('error in get balance', error)

			throw error
		}
	}
}
