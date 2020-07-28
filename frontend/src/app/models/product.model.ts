export class Product {
    name: string
    stock: number
    price: number
    image: any
    qty: number
  }
  
  export interface ProductResponse {
    productId: number
    name: string
    image: string
    stock: number
    price: number
    created: Date
  }
  
  