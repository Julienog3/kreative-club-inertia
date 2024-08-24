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
import UsersController from '#controllers/users_controller'
import PreferencesController from '#controllers/preferences_controller'
import app from '@adonisjs/core/services/app'
import PortfolioImagesController from '#controllers/portfolio_images_controller'
import PortfolioFoldersController from '#controllers/portfolio_folders_controller'
import BookmarksController from '#controllers/bookmarks_controller'
import AdminController from '#controllers/admin_controller'
import InboxController from '#controllers/inbox_controller'
import ChatsController from '#controllers/chats_controller'
import OrdersController from '#controllers/orders_controller'
import SecurityController from '#controllers/preferences/security_controller'
import DashboardController from '#controllers/dashboard_controller'
import QuotesController from '#controllers/quotes_controller'
import OrderProductsController from '#controllers/order_products_controller'
import OrderStepsController from '#controllers/order_steps_controller'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/', ({ inertia }) => inertia.render('home')).as('home')

// router.on('/').renderInertia('home', { version: 6 })
router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.get(':slug', async ({ response, params }) => {
    response.redirect().toRoute('creatives.portfolio', { slug: params.slug })
  })
  router.get(':slug/portfolio', [UsersController, 'portfolio']).as('creatives.portfolio')
  router.get(':slug/reviews', [UsersController, 'reviews'])
  router.get(':slug/get-in-touch', [UsersController, 'getInTouch'])
  router.post('/thumbnail/:id', [UsersController, 'setPortfolioImageAsThumbnail']).use(middleware.auth())
}).prefix('creatives')

router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.post('/register', [AuthController, 'register'])
  router.post('/logout', [AuthController, "logout"]).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.get('/profile', [PreferencesController, 'renderProfile']).as('preferences.profile')
  // router.put('/profile/edit', [PreferencesController, 'editProfile'])
  router.get('/creative-profile', [PreferencesController, 'renderCreativeProfile'])
  router.get('/notifications', [PreferencesController, 'renderNotifications'])
  router.get('/security', [SecurityController, 'render'])
  router.get('/portfolio', [PreferencesController, 'renderPortfolio']).as('preferences.portfolio')
  router.get('/portfolio/folders/:id', [PreferencesController, 'renderPortfolioFolderDetails'])
}).prefix('preferences').use(middleware.auth())

router.group(() => {
  router.get('/general', [AdminController, 'general'])
  router.get('/users', [AdminController, 'users'])
}).prefix('admin').use(middleware.auth())

router.group(() => {
  router.put(':id', [UsersController, 'update'])
  router.delete(':id', [UsersController, 'destroy'])
}).prefix('users').use(middleware.auth())

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

router.group(async () => {
  router.post('/', [OrdersController, 'store']).as('orders.store')
  router.post(':orderId/products', [OrderProductsController, 'store'])
  router.post(':orderId/steps', [OrderStepsController, 'store'])
})
.prefix('orders')
.use(middleware.auth())

router.group(async () => {
  router.get('/', [InboxController, 'index'])
  router.get('/:orderId', [InboxController, 'show']).as('inbox.show')
})
.prefix('inbox')
.use(middleware.auth())

router.post('/messages', [ChatsController, 'store']).use(middleware.auth())

router.group(async () => {
  router.get('/', [DashboardController, 'index'])
})
.prefix('dashboard')
.use(middleware.auth())

router.get('/quote/:orderId', [QuotesController, 'render']).use(middleware.auth())

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)
  
  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }
  
  const absolutePath = app.makePath('tmp','uploads', normalizedPath)
  return response.download(absolutePath)
})
