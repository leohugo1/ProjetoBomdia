import { LoginUseCase } from "./LoginUseCase.js"


class LoginController {
    async handle(request, response) {
        const { user, senha } = request.body
        const loginUseCase = new LoginUseCase()
        const result = await loginUseCase.execute({ user, senha })
        if (result.status === 400) return response.status(result.status).send(result.message)
        return response.status(result.status).json(result.user)
    }
}

export { LoginController }