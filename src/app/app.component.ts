import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  images: string[] = undefined;
  router: Router = undefined;

  constructor(private p_router: Router) {
    this.router = p_router;
  }

  ngOnInit(): void {
    this.images = [1, 2, 3].map((n) => `../assets/images/carousel/carousel_${n}.jpg`);
  }

}
