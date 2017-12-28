import { Action } from '@ngrx/store';
import { IPizza } from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Products] Get Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Get Pizzas Fail';
export const LOAD_PIZZAS_SUCCSESS = '[Products] Get Pizzas Success';

export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

// actions

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasSuccess implements Action {
    readonly type = LOAD_PIZZAS_SUCCSESS;

    constructor(public payload: Array<IPizza>) {}
}

export class LoadPizzasFail implements Action {
    readonly type = LOAD_PIZZAS_FAIL;

    constructor(public payload: any) {}
}

export class CreatePizza implements Action {
    readonly type = CREATE_PIZZA;

    constructor(public payload: IPizza) {}
}

export class CreatePizzaFail implements Action {
    readonly type = CREATE_PIZZA_FAIL;

    constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
    readonly type = CREATE_PIZZA_SUCCESS;

    constructor(public payload: IPizza) {}
}

// action types

export type TPizzasActions =
    | LoadPizzas
    | LoadPizzasSuccess
    | LoadPizzasFail
    | CreatePizza
    | CreatePizzaFail
    | CreatePizzaSuccess;
