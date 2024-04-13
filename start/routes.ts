/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { sep, normalize } from 'node:path'
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CreativesController from '#controllers/creatives_controller'
import PreferencesController from '#controllers/preferences_controller'
import app from '@adonisjs/core/services/app'
import PortfolioImagesController from '#controllers/portfolio_images_controller'
import PortfolioFoldersController from '#controllers/portfolio_folders_controller'
import BookmarksController from '#controllers/bookmarks_controller'
import AdminController from '#controllers/admin_controller'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/', ({ inertia }) => inertia.render('home'))

// router.on('/').renderInertia('home', { version: 6 })
router.group(() => {
  router.get('/', [CreativesController, 'index'])
  router.get(':slug', [CreativesController, 'show'])
}).prefix('creatives')

router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.post('/register', [AuthController, 'register'])
  router.post('/logout', [AuthController, "logout"]).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.get('/profile', [PreferencesController, 'renderProfile']).as('preferences.profile')
  router.put('/profile/edit', [PreferencesController, 'editProfile'])
  router.get('/creative-profile', [PreferencesController, 'renderCreativeProfile'])
  router.get('/notifications', [PreferencesController, 'renderNotifications'])
  router.get('/security', [PreferencesController, 'renderSecurity'])
  router.get('/portfolio', [PreferencesController, 'renderPortfolio']).as('preferences.portfolio')
  router.get('/portfolio/folders/:id', [PreferencesController, 'renderPortfolioFolderDetails'])
}).prefix('preferences').use(middleware.auth())

router.group(() => {
  router.get('/general', [AdminController, 'general'])
  router.get('/users', [AdminController, 'users'])
}).prefix('admin').use(middleware.auth())

router.group(async () => {
  router.group(async () => {
    router.get('/', [PortfolioImagesController, 'index'])
    router.get(':portfolioImageId', [PortfolioImagesController, 'show'])
    router.post('/', [PortfolioImagesController, 'store'])
    router.delete(':portfolioImageId', [PortfolioImagesController, 'destroy'])
    router.patch(':portfolioImageId', [PortfolioImagesController, 'update'])
  }).prefix('images')

  router.group(async () => {
    router.get('/', [PortfolioFoldersController, 'index'])
    router.post('/', [PortfolioFoldersController, 'store'])
    router.delete(':portfolioFolderId', [PortfolioFoldersController, 'destroy'])
  }).prefix('folders')
}).prefix('portfolio').use(middleware.auth())

router.group(async () => {
  router.get('/', [BookmarksController, 'index'])
  router.post(':creativeId', [BookmarksController, 'bookmark'])
})
.prefix('bookmarks')
.use(middleware.auth())


.prefix('bookmarks')
.use(middleware.auth())

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)
  
  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }
  
  const absolutePath = app.makePath('tmp','uploads', normalizedPath)
  return response.download(absolutePath)
})
