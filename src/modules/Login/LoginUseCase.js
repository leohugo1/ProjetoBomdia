import { compareSync } from 'bcrypt'
import { readFileSync } from 'fs'
class LoginUseCase {
    async execute({ user, senha }) {
        let us;
        const usuario = readFileSync('./src/database/users.csv')
        const arr = usuario.toString().split('\n')
        arr.map((item) => {
            item = item.split(',')
            if (item[0] === user) {
                us = item
            }
        })
        if (us) {
            const isEquals = compareSync(senha, us[1])
            if (isEquals) {
                return {
                    status: 200,
                    user: us[0],
                }
            }
        }
        return {
            status: 400,
            message: 'Usuário ou senha incorretos'
        }
    }
}

export { LoginUseCase }