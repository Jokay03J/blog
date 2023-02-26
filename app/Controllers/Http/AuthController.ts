import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

enum AUTHSTATE {
  USER_NOT_FOUND = 'E_INVALID_AUTH_UID: User not found',
  PASSWORD_MISS_MATCH = 'E_INVALID_AUTH_PASSWORD: Password mis-match',
}

export default class AuthController {
  public async accountShow({ view, auth, response }: HttpContextContract) {
    if (auth.isLoggedOut) response.redirect().toRoute('auth.login.show')
    return view.render('auth/account')
  }

  public async loginShow({ view, auth, response }: HttpContextContract) {
    if (auth.isLoggedIn) response.redirect('/')
    return view.render('auth/login')
  }

  public async login({ session, response, request, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      await auth.attempt(email, password)
    } catch (error) {
      switch (error.message) {
        case AUTHSTATE.USER_NOT_FOUND:
          session.flash('form', 'Utilisateur non enregistrer !')
          break

        case AUTHSTATE.PASSWORD_MISS_MATCH:
          session.flash('form', 'mot de passe incorrect !')
          break
        default:
          session.flash('form', 'Une erreur est survenue ! Veuillez réessayer plus tard !')
          break
      }

      return response.redirect().back()
    }

    return response.redirect('/account')
  }

  public async registerShow({ view, auth, response }: HttpContextContract) {
    if (auth.isLoggedIn) response.redirect('/')
    return view.render('auth/register')
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    const data = await request.validate({
      schema: userSchema,
      messages: {
        'required': 'Le champs {{ field }} est requis.',
        'username.unique': 'Surnom déjà utilisé.',
        'username.required': 'Le surnom est obligatoire !',
        'email.required': "L'adresse mail est obligatoire ! ",
        'email.email': 'Adresse mail invalide !',
        'password.required': 'Le mot de passe est obligatoire !',
        'password.minLength':
          'Le mot de passe doit faire plus de {{ options.minLength }} caractères minimum !',
      },
    })

    const user = await User.create(data)

    await auth.login(user)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
