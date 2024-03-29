/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CreativesController from '#controllers/creatives_controller'

router.get('/', ({ inertia }) => inertia.render('home'))

// router.on('/').renderInertia('home', { version: 6 })
router.group(() => {
  router.get('/', [CreativesController, 'index'])
  router.get(':id', [CreativesController, 'show'])
}).prefix('creatives')

router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.post('/register', [AuthController, 'register'])
  router.post('/logout', [AuthController, "logout"]).use(middleware.auth())
}).prefix('auth')