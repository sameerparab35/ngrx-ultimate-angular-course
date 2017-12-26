import * as fromPizzasReducers from './pizzas.reducers';

import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import { IPizzaEntities } from '../../models/pizza.model';

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
export const selectPizzasEntities = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.entities
);
export const selectPizzas = createSelector(
	selectPizzasEntities,
	(entities: IPizzaEntities) => Object.keys(entities).map(key => entities[parseInt(key, 10)])
);
export const selectPizzasLoading = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.loading
);
export const selectPizzasLoaded = createSelector(
	selectPizzasState,
	(state: fromPizzasReducers.IPizzasState) => state.loaded
);