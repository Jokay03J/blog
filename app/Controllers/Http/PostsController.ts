import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'
import showdown from 'showdown'
import sanitizeHtml from 'sanitize-html'

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    return view.render('home')
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const postSchema = schema.create({
      title: schema.string({}, [rules.maxLength(50)]),
      description: schema.string({}, [rules.maxLength(100)]),
      content: schema.string(),
    })

    const postPayload = await request.validate({
      schema: postSchema,
      messages: {
        'required': 'le champs {{ field }} est obligatoire',
        'title.maxLength': 'Le titre ne peut pas faire plus de {{ options.maxLength}} caractères !',
        'description.maxLength':
          'Le titre ne peut pas faire plus de {{ options.maxLength}} caractères !',
      },
    })

    if (!auth.isLoggedIn) return response.unauthorized()

    const post = await Post.create({ ...postPayload, author_id: auth.user?.id })
    return response.redirect(`/post?postId=${post.id}`)
  }

  public async createShow({ view, auth, response }: HttpContextContract) {
    if (!auth.isLoggedIn) return response.redirect().toRoute('auth.login.show')
    return view.render('posts/newPost')
  }

  public async getOne({ view, request, response }: HttpContextContract) {
    const schemaPayload = schema.create({ postId: schema.number() })
    const { postId } = await request.validate({ schema: schemaPayload })
    try {
      const post = await Post.findOrFail(postId)
      await post.load('author')
      const converter = new showdown.Converter()
      const html = converter.makeHtml(post.content)
      const sanitizedHtml = sanitizeHtml(html)
      post.content = sanitizedHtml

      return view.render('posts/getOne', { post })
    } catch (error) {
      console.log(error)

      return response.notFound()
    }
  }

  public async getAll() {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
