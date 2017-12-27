import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbService } from './db.service';

import * as fromStore from '../store';
import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';

@Injectable()
export class ToppingsService {
    constructor(
        private dbService: DbService,
        // todo: clarify why is this not the AppState store
        private store: Store<fromStore.IProductsState>
    ) {}

    getToppings() {
        this.store.dispatch(new fromActions.LoadToppings());
        return this.store.select(fromSelectors.selectToppings);
    }
}
