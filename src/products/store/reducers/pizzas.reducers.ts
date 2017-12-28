import { IPizzaEntities, IPizza } from '../../models/pizza.model';

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
    action: fromActions.TPizzasActions
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

            const entities = pizzas.reduce(
                (entities: IPizzaEntities, pizza: IPizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza
                    };
                },
                { ...state.entities }
            );

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

        case fromActions.CREATE_PIZZA_SUCCESS: {
            const createdPizza = action.payload;
            const newPizzaEntity = { [createdPizza.id]: createdPizza };
            const entities = { ...state.entities, ...newPizzaEntity };
            return {
                ...state,
                entities
            };
        }

        default: {
            return state;
        }
    }
}
