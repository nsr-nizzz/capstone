import 'tsconfig-paths/register';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Hapus semua data
  await knex('user_courses').del();

  // Ambil id user dan course dari database
  const users = await knex('users').select('id');
  const courses = await knex('courses').select('id');

  if (users.length > 0 && courses.length > 0) {
    const data = [
      {
        user_id: users.find(u => u.id === 2)?.id || users[0].id, // student
        course_id: courses[0].id,
      },
      {
        user_id: users.find(u => u.id === 2)?.id || users[0].id,
        course_id: courses[1].id,
      },
    ];

    await knex('user_courses').insert(data);
  }
}
