import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzasReducers from '../reducers/pizzas.reducers';
import { IPizzaEntities } from '../../models/pizza.model';
import { IProductsState } from '../reducers';

// product

export const selectProductsState = createFeatureSelector('products');

// pizzas

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
    (entities: IPizzaEntities) =>
        Object.keys(entities).map(key => entities[parseInt(key, 10)])
);
export const selectPizzasLoading = createSelector(
    selectPizzasState,
    (state: fromPizzasReducers.IPizzasState) => state.loading
);
export const selectPizzasLoaded = createSelector(
    selectPizzasState,
    (state: fromPizzasReducers.IPizzasState) => state.loaded
);
