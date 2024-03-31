import { PrismaClient, Users } from '@prisma/client'

import { CreateUserDto, UpdateUserDto } from './dto/user.dto'

export class UserRepository {
	client: { users: PrismaClient['users'] }

	constructor(client: PrismaClient) {
		this.client = {
			users: client.users,
		}
	}

	async findAll(): Promise<Users[]> {
		try {
			const users = await this.client.users.findMany()

			return users
		} catch (error) {
			console.error(error)

			throw new Error('failed to find all users')
		}
	}

	async findById(userId: number): Promise<Users | null> {
		try {
			const user = await this.client.users.findUnique({
				where: {
					userId,
				},
			})

			if (!user) {
				return null
			}

			return user
		} catch (error) {
			console.error(error)

			throw new Error('failed to find user by id')
		}
	}

	async create(userData: CreateUserDto): Promise<Users> {
		try {
			const newUser = await this.client.users.create({
				data: userData,
			})

			return newUser
		} catch (error) {
			console.error(error)

			throw new Error('failed to create user')
		}
	}

	async update(userId: number, userData: UpdateUserDto): Promise<Users> {
		try {
			const updateUser = await this.client.users.update({
				where: { userId },
				data: userData,
			})

			return updateUser
		} catch (error) {
			console.error(error)

			throw new Error('failed to update user')
		}
	}
}
