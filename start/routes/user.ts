import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('login', 'AuthController.loginShow').as('auth.login.show')
  Route.post('login', 'AuthController.login').as('auth.login')
  Route.get('register', 'AuthController.registerShow').as('auth.register.show')
  Route.post('register', 'AuthController.register').as('auth.register')
  Route.get('logout', 'AuthController.logout').as('auth.logout')
  Route.post('resetPassword', 'AuthController.resetPassword').as('auth.resetPassword')
  Route.get('resetPassword/success', 'AuthController.resetPasswordSuccessShow').as(
    'auth.resetPassword.success'
  )
  Route.get('resetPassword/error', 'AuthController.resetPasswordErrorShow').as(
    'auth.resetPassword.error'
  )
})
