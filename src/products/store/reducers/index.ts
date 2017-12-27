import * as fromPizzasReducers from './pizzas.reducers';
import * as fromToppingsReducers from './toppings.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface IProductsState {
    pizzas: fromPizzasReducers.IPizzasState;
    toppings: fromToppingsReducers.IToppingsState;
}

export const reducers: ActionReducerMap<IProductsState> = {
    pizzas: fromPizzasReducers.reducer,
    toppings: fromToppingsReducers.reducer
};
