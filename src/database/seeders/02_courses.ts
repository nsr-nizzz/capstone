import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { Course } from '../../models/course-model';
import { generateSlugCourse } from '../../utilities/slug';

export async function seed(knex: Knex): Promise<void> {
  // Hapus semua data
  await knex(Course.tableName).del();

  // Data awal course
  const data: Course[] = [
    {
      title: 'Belajar JavaScript Dasar',
      slug: generateSlugCourse('Belajar JavaScript Dasar'),
      description: 'Kursus ini mengajarkan dasar-dasar JavaScript untuk pemula.',
      image: '/uploads/courses/js-dasar.png',
    },
    {
      title: 'Pemrograman Node.js Lanjut',
      slug: generateSlugCourse('Pemrograman Node.js Lanjut'),
      description: 'Materi lanjutan untuk pengembangan backend menggunakan Node.js.',
      image: '/uploads/courses/nodejs-lanjut.png',
    },
  ];

  await knex(Course.tableName).insert(data);
}
