import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: ProductType[] = [];
  public loading: boolean = false;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router
  ) { }

  ngOnInit() {
    // this.products = this.productService.getProducts();
    // this.http.get<{data: ProductType[]}>('http://testologia.ru/pizzas?extraField=1')
    this.loading = true;
    this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      // .pipe(
      //
      //   tap((result) => {
      //     console.log(result);
      //   }),
      //
      //   map((result) => (result.data)),
      //   catchError(error => {
      //    return of([]);
      //   }),
      //   retry(3)
      // )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            console.log('next');
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
    }
        })
  }

  // public addToCart(title: string): void {
  //   this.cartService.product = title;
  //   // this.router.navigate(['/order']);
  //   // this.router.navigate(['/order', {product: title}]);
  //   this.router.navigate(['/order'], {queryParams: {product: title}});
  // }

}
