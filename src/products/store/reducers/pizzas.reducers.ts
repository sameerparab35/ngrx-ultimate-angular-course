import { Pizza } from '../../models/pizza.model';

import * as fromActions from '../actions';

export interface IPizzasState {
    data: Array<Pizza>;
    loaded: boolean;
    loading: boolean;
}

export const initialState: IPizzasState = {
    data: [],
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
            return {
                ...state,
                loaded: true,
                loading: false,
                data: action.payload
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
