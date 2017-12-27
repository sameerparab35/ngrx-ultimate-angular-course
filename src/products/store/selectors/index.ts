import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRootStore from '../../../app/store';
import * as fromProductStore from '../../store';
import * as fromPizzasReducers from '../reducers/pizzas.reducers';

import { IPizzaEntities } from '../../models/pizza.model';

// product

export const selectProductsState = createFeatureSelector('products');

// pizzas

export const selectPizzasState = createSelector(
    selectProductsState,
    (state: fromProductStore.IProductsState) => state.pizzas
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
export const selectSelectedPizza = createSelector(
    selectPizzasEntities,
    fromRootStore.selectParams,
    (entities, params) => entities[params.pizzaId]
);
