import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

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
        this.pizza$ = this.pizzaService.getSelectedOrNewPizza().pipe(
            tap((pizza: IPizza) => {
                const toppings = pizza.toppings || [];

                const selectedToppings = toppings.map(topping => topping.id);

                this.onSelect(selectedToppings);
            })
        );

        this.toppings$ = this.toppingsService.getToppings();
        this.visualise$ = this.pizzaService.getVisualisedPizza();
    }

    onSelect(event: number[]) {
        this.toppingsService.selectToppings(event);
    }

    onCreate(event: IPizza) {
        this.pizzaService.createPizza(event);
    }

    onUpdate(event: IPizza) {}

    onRemove(event: IPizza) {
        const remove = window.confirm('Are you sure?');
        if (remove) {
        }
    }
}
