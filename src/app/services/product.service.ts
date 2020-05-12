import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products"
  private categoryUrl = "http://localhost:8080/api/product-category"

  //////// AWS Spring App  ////////
  //private baseUrl = "http://springapi-env.eba-gwjkmbiq.us-east-2.elasticbeanstalk.com/api/products"
  //private categoryUrl = "http://springapi-env.eba-gwjkmbiq.us-east-2.elasticbeanstalk.com/api/product-category"

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    const productUrl = this.baseUrl + "/" + productId;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = this.baseUrl + '/search/findByCategoryId?id=' + categoryId;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: String): Observable<Product[]>{
    const searchUrl = this.baseUrl + '/search/findByNameContaining?name=' + theKeyword;
    return this.getProducts(searchUrl);
  }

    private getProducts(searchUrl: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProduct>(searchUrl)
            .pipe(map(response => response._embedded.products));
    }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map(response => response._embedded.productCategory))
  }

  
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}