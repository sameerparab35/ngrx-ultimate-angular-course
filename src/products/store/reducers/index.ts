import * as fromPizzasReducers from './pizzas.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface IProductsState {
    pizzas: fromPizzasReducers.IPizzasState;
}

export const reducers: ActionReducerMap<IProductsState> = {
    pizzas: fromPizzasReducers.reducer
};
