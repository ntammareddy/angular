import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  prod_productsListUrl: string = Constants.productsUrl;
  cate_categoryListUrl: string = Constants.categoryUrl;
  prod_findByIdUrl: string = Constants.productsUrl + '/1'
  prod_findByCategoryIdUrl: string = Constants.productsUrl + '/search/findByCategoryId?id=1';
  prod_findByNameContainingUrl: string = Constants.productsUrl + '/search/findByNameContaining?name=Arling'


  constructor() { }

  ngOnInit(): void {
  }

}
