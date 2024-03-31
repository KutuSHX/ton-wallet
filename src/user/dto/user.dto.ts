export interface CreateUserDto {
	userId: number
	address: string
	mnemonics: string[]
}

export interface UpdateUserDto {
	languages?: string | undefined
}
