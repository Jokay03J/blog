import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PostsController.index').as('posts.home')
  Route.get('post', 'PostsController.getOne').as('posts.getOne.show')
  Route.post('posts', 'PostsController.create').as('posts.create')
  Route.get('createPost', 'PostsController.createShow').as('posts.create.show')
  Route.delete('post', 'PostsController.destroy').as('posts.destroy')
  Route.put('post', 'PostsController.update').as('posts.update')
})
