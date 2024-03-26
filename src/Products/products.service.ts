import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, description: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(prodId);
    const updatedProd = { ...product };
    if (title) updatedProd.title = title;
    if (description) updatedProd.description = description;
    if (price) updatedProd.price = price;
    this.products[index] = updatedProd;
  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find this product');
    return [product, productIndex];
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }
}
