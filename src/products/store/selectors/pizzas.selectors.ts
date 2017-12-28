import { createSelector } from '@ngrx/store';

import { IPizzaEntities } from '../../models/pizza.model';

import * as fromRootStore from '../../../app/store';
import * as fromProductStore from '../index';
import * as fromPizzasReducers from '../reducers/pizzas.reducers';
import * as fromProductSelectors from './product.selectors';
import * as fromToppingsSelectors from './toppings.selectors';

export const selectPizzasState = createSelector(
    fromProductSelectors.selectProductsState,
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
export const selectVisualisedPizza = createSelector(
    selectSelectedPizza,
    fromToppingsSelectors.selectSelectedToppings,
    fromToppingsSelectors.selectToppingsEntities,
    (pizza, selectedToppings, toppingEntities) => {
        const toppings = selectedToppings.map(id => toppingEntities[id]);

        return { ...pizza, toppings };
    }
);
