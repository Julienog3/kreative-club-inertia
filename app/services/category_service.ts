import Category from "#models/category";


export default class CategoryService {
  async getAllCategories() {
    const categories = await Category.query()
    return categories
  }
}