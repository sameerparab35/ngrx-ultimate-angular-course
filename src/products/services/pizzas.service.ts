import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbService } from './db.service';

import { Pizza } from '../models/pizza.model';

import * as fromReducers from '../store/reducers';
import * as fromActions from '../store/actions';

@Injectable()
export class PizzasService {
    constructor(
        private dbService: DbService,
        private store: Store<fromReducers.IProductsState>
    ) {}

    getPizzas() {
        this.store.dispatch(new fromActions.LoadPizzas());
        return this.store.select(fromReducers.selectPizzas);
    }

    createPizza(payload: Pizza) {
        return this.dbService.createPizza(payload);
    }

    updatePizza(payload: Pizza) {
        return this.dbService.updatePizza(payload);
    }

    removePizza(payload: Pizza) {
        return this.dbService.removePizza(payload);
    }
}
