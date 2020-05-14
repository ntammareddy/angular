import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    const productUrl = Constants.productsUrl + "/" + productId;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = Constants.productsUrl + '/search/findByCategoryId?id=' + categoryId;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: String): Observable<Product[]>{
    const searchUrl = Constants.productsUrl + '/search/findByNameContaining?name=' + theKeyword;
    return this.getProducts(searchUrl);
  }

    private getProducts(searchUrl: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProduct>(searchUrl)
            .pipe(map(response => response._embedded.products));
    }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(Constants.categoryUrl)
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
