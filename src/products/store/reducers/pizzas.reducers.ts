import { IPizzaEntities, Pizza } from '../../models/pizza.model';

import * as fromActions from '../actions';

export interface IPizzasState {
    entities: IPizzaEntities;
    loaded: boolean;
    loading: boolean;
}

export const initialState: IPizzasState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromActions.PizzasActions
): IPizzasState {
    switch (action.type) {
        case fromActions.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromActions.LOAD_PIZZAS_SUCCSESS: {
            const pizzas = action.payload;

            const entities = pizzas.reduce((entities: IPizzaEntities, pizza: Pizza) => {
                return {
                    ...entities,
                    [pizza.id]: pizza
                };
            }, {...state.entities});

            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }

        case fromActions.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default: {
            return state;
        }
    }
}
