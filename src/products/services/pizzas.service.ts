import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbService } from './db.service';

import { IPizza } from '../models/pizza.model';

import * as fromStore from '../store';
import * as fromActions from '../store/actions';
import * as fromSelectors from '../store/selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PizzasService {
    constructor(
        private dbService: DbService,
        private store: Store<fromStore.IProductsState>
    ) {}

    loadPizzas() {
	    this.store.dispatch(new fromActions.LoadPizzas());
    }

    getPizzas() {
        return this.store.select(fromSelectors.selectPizzas);
    }

    getSelectedPizza(): Observable<IPizza> {
        return this.store.select(fromSelectors.selectSelectedPizza);
    }

	getSelectedOrNewPizza() {
        return this.getSelectedPizza()
            .pipe(map((pizza: IPizza) => pizza || {}));
    }

	getVisualisedPizza() {
        return this.store.select(fromSelectors.selectVisualisedPizza);
    }

    createPizza(payload: IPizza) {
        this.store.dispatch(new fromActions.CreatePizza(payload));
    }

    updatePizza(payload: IPizza) {
        return this.dbService.updatePizza(payload);
    }

    removePizza(payload: IPizza) {
        return this.dbService.removePizza(payload);
    }
}
