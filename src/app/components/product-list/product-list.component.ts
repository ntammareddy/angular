import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  products: Product[];
  searchMode: boolean;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProducts())
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }    
  }

  handleSearchProducts() {
    const theKeyword: String = this.route.snapshot.paramMap.get("keyword");
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{ this.products = data })
  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if (hasCategoryId) {
      //get the "id" param string. convert string to number
      this.currentCategoryId = parseInt(this.route.snapshot.paramMap.get("id"));
    }
    else {
      //default to 1 as category
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(data => this.products = data);
  }

  addToCart(product: Product) {
    const cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
