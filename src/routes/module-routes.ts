const router = require('express').Router({ mergeParams: true });

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');

// Controller nanti kita buat di src/controllers/module-controller.ts
const moduleController = require('../controllers/module-controller');

/**
 * GET /api/courses/:courseSlug/modules
 * Ambil semua modul dalam 1 course
 */
router.get('/', moduleController.index);

/**
 * GET /api/courses/:courseSlug/modules/:moduleSlug
 * Ambil modul spesifik dalam course
 */
router.get('/:moduleSlug', moduleController.show);

// Middleware proteksi untuk operasi CUD
router.use(authenticationMiddleware, onlyAdminMiddleware);

/**
 * POST /api/courses/:courseSlug/modules
 * Tambah modul baru ke course
 */
router.post('/', moduleController.create);

/**
 * PATCH /api/courses/:courseSlug/modules/:moduleSlug
 * Update modul
 */
router.patch('/:moduleSlug', moduleController.update);

/**
 * DELETE /api/courses/:courseSlug/modules/:moduleSlug
 * Hapus modul
 */
router.delete('/:moduleSlug', moduleController.destroy);

module.exports = router;
