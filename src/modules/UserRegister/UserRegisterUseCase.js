import { readFileSync, writeFileSync, access, constants } from 'fs'
import bcrypt from 'bcrypt'
class UserRegisterUseCase {
    VerificarData(data) {
        const Novadata = new Date(data)
        const dia = Novadata.getDay()
        const mes = Novadata.getMonth()
        const ano = Novadata.getFullYear()
        console.log(dia, mes, ano)
        if ((dia > 0 && dia <= 31) && (mes > 0 && mes <= 12) && (ano > 1900 && ano <= new Date().getFullYear())) {
            return true
        }
        return false

    }
    async execute({ user, senha, dataNascimento, senhaVerify }) {
        if (senha !== senhaVerify) return {
            status: 400,
            message: 'Senhas não conferem'
        }

        if (this.VerificarData(dataNascimento) === false) return {
            status: 400,
            message: 'Data de nascimento inválida'
        }

        const salt = 10
        const hash = bcrypt.hashSync(senha, salt)
        senha = hash


        access('./src/database/users.csv', constants.R_OK, (err) => {
            if (err) {

                writeFileSync('./src/database/users.csv', `${user},${senha},${dataNascimento}\n`)
            } else {
                const data = readFileSync('./src/database/users.csv')
                let arr = data.toString()
                arr = arr.split('\n')
                arr.map((item) => {
                    item = item.split(',')
                    if (item[0] === user) {
                        return {
                            status: 400,
                            message: 'Usuário já cadastrado'
                        }
                    }
                })

                arr.push(`${user},${senha},${dataNascimento}`)

                writeFileSync('./src/database/users.csv', arr.join('\n'))
            }
        })

        return {
            status: 201,
            message: 'Usuário cadastrado com sucesso'
        }
    }
}

export { UserRegisterUseCase }