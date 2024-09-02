import Order from '#models/order'
import { createOrderFileValidator } from '#validators/order'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { createReadStream } from 'fs'

export default class OrderFilesController {
  public async download({ request, response, params }: HttpContext) {
    const { orderId } = params
    const order = await Order.query().where('id', orderId).preload('files').firstOrFail()

    const filePath = app.makePath(`uploads/orders/${orderId}/order.zip`)


    // order.files.forEach(async ({ file }) => {
    //   const orderFile = await fetch(file).then(r => r.blob())
    //   zip.file(file, orderFile)
    // })

    // const normalizedPath = normalize(filePath)
  
  
    // const absolutePath = app.makePath('tmp','uploads', normalizedPath)
    // return response.download()
  }
  public async store({ request, response, params }: HttpContext) {
    // TODO: Add ability
    const { orderId } = params
    const order = await Order.findOrFail(orderId) 

    const { files } = await request.validateUsing(createOrderFileValidator)

    files.forEach(async (file) => {
      const fileUrl = `${cuid()}.${file.extname}`
      await file.move(app.tmpPath('uploads', 'orders', order.id), {
        name: fileUrl
      })
      await order.related('files').create({ file: `/uploads/orders/${order.id}/` + fileUrl })
    })

    await order.related('steps').create({ name: "files-sended" })    
    return response.redirect().back()
  }
}