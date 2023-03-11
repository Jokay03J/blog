import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      { id: 1, username: 'test', email: 'test@test.org', is_admin: false, password: 'test' },
      { id: 2, username: 'admin', email: 'admin@admin.org', is_admin: true, password: 'admin' },
    ])
  }
}
