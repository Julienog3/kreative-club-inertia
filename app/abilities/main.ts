import Order from '#models/order'
import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const editPortfolioImage = Bouncer.ability((user: User, portfolioImage: PortfolioImage) => {
  return user.id === portfolioImage.userId
})

export const updateUser = Bouncer.ability((user: User, userId: string) => {
  return user.id === userId
})

export const deleteUser = Bouncer.ability((user: User, userId: string) => {
  return user.id === userId
})

export const createQuote = Bouncer.ability(async (user: User, orderId: string) => {
  const order = await Order.query().where('id', orderId).preload('seller').firstOrFail()
  return user.id === order.seller.id
}) 

export const showOrderAsSeller = Bouncer.ability(async (user: User, orderId: string) => {
  const order = await Order.query().where('id', orderId).preload('seller').firstOrFail()
  return user.id === order.seller.id
})

export const showOrderAsCustomer = Bouncer.ability(async (user: User, orderId: string) => {
  const order = await Order.query().where('id', orderId).preload('customer').firstOrFail()
  return user.id === order.customer.id
})

export const createReview = Bouncer.ability(async (user: User, orderId: string) => {
  const order = await Order.query().where('id', orderId).preload('customer').preload('steps').firstOrFail()
  const currentStep = await order.steps?.reduce((acc, curr) => {
    return curr.createdAt > acc.createdAt ? curr : acc;
  }, order.steps[0]);
  
  return user.id === order.customer.id && currentStep.name === 'order-validated'
})