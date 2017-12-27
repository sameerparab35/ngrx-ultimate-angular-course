import { ITopping } from '../../models/topping.model';

import * as fromActions from '../actions';

export interface IToppingsState {
    data: Array<ITopping>;
    loaded: boolean;
    loading: boolean;
}

export const initialState: IToppingsState = {
	data: [],
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromActions.TToppingsActions
): IToppingsState {
    switch (action.type) {
        case fromActions.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromActions.LOAD_TOPPINGS_SUCCSESS: {
            return {
                ...state,
                loaded: true,
                loading: false,
                data: action.payload
            };
        }

        case fromActions.LOAD_TOPPINGS_FAIL: {
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
