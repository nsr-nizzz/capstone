import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { generateSlugModule } from '../../utilities/slug';

export async function seed(knex: Knex): Promise<void> {
  // Hapus semua data
  await knex('modules').del();

  // Ambil ID course
  const courses = await knex('courses').select('id', 'title');

  if (courses.length > 0) {
    const data = [
      // Untuk course pertama
      {
        course_id: courses[0].id,
        title: 'Pengenalan JavaScript',
        slug: generateSlugModule('Pengenalan JavaScript'),
        description: 'Modul ini berisi pengantar JavaScript.',
        content: 'Materi lengkap pengantar JavaScript...',
        order: 1,
      },
      {
        course_id: courses[0].id,
        title: 'Variabel dan Tipe Data',
        slug: generateSlugModule('Variabel dan Tipe Data'),
        description: 'Belajar variabel dan tipe data di JavaScript.',
        content: 'Materi lengkap variabel dan tipe data...',
        order: 2,
      },

      // Untuk course kedua
      {
        course_id: courses[1].id,
        title: 'Konsep Asynchronous di Node.js',
        slug: generateSlugModule('Konsep Asynchronous di Node.js'),
        description: 'Belajar event loop, callback, promise, dan async/await.',
        content: 'Materi lengkap konsep asynchronous di Node.js...',
        order: 1,
      },
    ];

    await knex('modules').insert(data);
  }
}
