import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IPizza } from '../../models/pizza.model';
import { ITopping } from '../../models/topping.model';

import { PizzasService } from '../../services';
import { ToppingsService } from '../../services';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.scss'],
    template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
    pizza$: Observable<IPizza>;
    toppings$: Observable<Array<ITopping>>;

    visualise$: Observable<IPizza>;

    constructor(
        private pizzaService: PizzasService,
        private toppingsService: ToppingsService
    ) {}

    ngOnInit() {
        this.pizza$ = this.pizzaService.getSelectedOrNewPizza();
        this.visualise$ = this.pizza$;

        this.toppings$ = this.toppingsService.getToppings();
    }

    onSelect(event: number[]) {}

    onCreate(event: IPizza) {}

    onUpdate(event: IPizza) {}

    onRemove(event: IPizza) {
        const remove = window.confirm('Are you sure?');
        if (remove) {
        }
    }
}
