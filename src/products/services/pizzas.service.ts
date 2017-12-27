import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbService } from './db.service';

import { IPizza } from '../models/pizza.model';

import * as fromStore from '../store';
import * as fromActions from '../store/actions';
import * as fromSelectors from '../store/selectors';

@Injectable()
export class PizzasService {
    constructor(
        private dbService: DbService,
        private store: Store<fromStore.IProductsState>
    ) {}

    getPizzas() {
        this.store.dispatch(new fromActions.LoadPizzas());
        return this.store.select(fromSelectors.selectPizzas);
    }

    createPizza(payload: IPizza) {
        return this.dbService.createPizza(payload);
    }

    updatePizza(payload: IPizza) {
        return this.dbService.updatePizza(payload);
    }

    removePizza(payload: IPizza) {
        return this.dbService.removePizza(payload);
    }
}
