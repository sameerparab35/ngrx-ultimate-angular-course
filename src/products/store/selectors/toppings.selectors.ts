import { createSelector } from '@ngrx/store';

import { ITopping } from '../../models/topping.model';

import * as fromProductStore from '../index';
import * as fromProductSelectors from './product.selectors';
import * as fromToppingsReducers from '../reducers/toppings.reducers';

export const selectToppingsState = createSelector(
	fromProductSelectors.selectProductsState,
	(state: fromProductStore.IProductsState) => state.toppings
);
export const selectToppings = createSelector(
	selectToppingsState,
	(state: fromToppingsReducers.IToppingsState) => state.data
);
export const selectToppingsEntities = createSelector(
	selectToppings,
	(toppings: Array<ITopping>) => toppings.reduce((entities, topping) => ({...entities, [topping.id]: topping}), {})
);
export const selectToppingsLoading = createSelector(
	selectToppingsState,
	(state: fromToppingsReducers.IToppingsState) => state.loading
);
export const selectToppingsLoaded = createSelector(
	selectToppingsState,
	(state: fromToppingsReducers.IToppingsState) => state.loaded
);
export const selectSelectedToppings = createSelector(
	selectToppingsState,
	(state: fromToppingsReducers.IToppingsState) => state.selectedToppings
);