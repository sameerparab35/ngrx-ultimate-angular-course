import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IPizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/';
import { Observable } from 'rxjs/Observable';
import { ToppingsService } from '../../services';

@Component({
    selector: 'products',
    styleUrls: ['products.component.scss'],
    template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
    pizzas$: Observable<IPizza[]>;

    constructor(
        private pizzaService: PizzasService,
        private toppingsService: ToppingsService
    ) {}

    ngOnInit() {
        this.pizzaService.loadPizzas();
        this.toppingsService.loadToppings();
        this.pizzas$ = this.pizzaService.getPizzas();
    }
}
