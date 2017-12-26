import * as fromPizzasReducers from './pizzas.reducers';

import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

export interface IProductsState {
    pizzas: fromPizzasReducers.IPizzasState;
}

export const reducers: ActionReducerMap<IProductsState> = {
    pizzas: fromPizzasReducers.reducer
};


// product selector

export const selectProductsState = createFeatureSelector('products');

// pizzas selectors

export const selectPizzasState = createSelector(
	selectProductsState,
    (state: IProductsState) => state.pizzas
);
export const selectPizzas = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.data
);
export const selectPizzasLoading = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.loading
);
export const selectPizzasLoaded = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.loaded
);