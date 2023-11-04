import { UserRegisterUseCase } from './UserRegisterUseCase.js'

class UserRegisterController {
    async handle(request, response) {
        const { user, senha, dataNascimento, senhaVerify } = request.body
        const userRegisterUseCase = new UserRegisterUseCase()
        const result = await userRegisterUseCase.execute({ user, senha, dataNascimento, senhaVerify })
        if (result.status === 400) return response.status(result.status).send(result.message)
        return response.status(result.status).send(result.message)
    }
}

export { UserRegisterController }