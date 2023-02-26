import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('post', 'PostsController.index')
  Route.put('post', 'PostsController.update')
})
