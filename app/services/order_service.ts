import Order from "#models/order";
import User from "#models/user";

export default class OrderService {
  public async create(payload: any) {
    const { sellerId, customerId, ...rest } = payload

    const seller = await User.findOrFail(sellerId)
    const customer = await User.findOrFail(customerId)

    const order = new Order()
    await order.related('customer').save(customer)
    await order.related('seller').save(seller)
    await order.merge({ ...rest }).save()

    return order
  }
}