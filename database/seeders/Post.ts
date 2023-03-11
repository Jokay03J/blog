import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const owner = await User.firstOrFail()
    await Post.createMany([
      {
        title: 'test post',
        description: 'test post description',
        content: 'test post content',
        author_id: owner.id,
      },
    ])
  }
}
