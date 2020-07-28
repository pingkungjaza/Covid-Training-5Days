import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member, RegisterResponse, LoginResponse } from '../models/member.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductResponse} from 'src/app/models/product.model';
// for DI
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { 

  }

register(member: Member): Observable<RegisterResponse>{
  return this.httpClient.post<RegisterResponse>(`auth/register`, member);
}


login(member: Member): Observable<LoginResponse>{
  return this.httpClient.post<LoginResponse>(`auth/login`, member);
}
getProductImageURL(image: string) {
  if (image) {
    return `${environment.baseAPIURL}api/product/images/${image}`
  } else {
    return 'assets/images/no_photo.png'
  }
}

getProducts(): Observable<ProductResponse[]> {
  return this.httpClient.get<ProductResponse[]>('product')
}

getProduct(id: number): Observable<ProductResponse> {
  return this.httpClient.get<ProductResponse>(`product/${id}`)
}

addProduct(product: Product): Observable<ProductResponse> {
  return this.httpClient.post<ProductResponse>(`product`, this.makeFormData(product))
}

editProduct(product: Product, id: number): Observable<ProductResponse> {
  return this.httpClient.put<ProductResponse>(`product/${id}`, this.makeFormData(product))
}

deleteProduct(id: number) {
  return this.httpClient.delete(`product/${id}`)
}

makeFormData(product: Product): FormData {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', `${product.price}`);
  formData.append('stock', `${product.stock}`);
  formData.append('file', product.image);
  return formData;
}
}
