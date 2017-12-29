import { PizzaExistsGuard, PizzasLoadedGuard } from './pizza.guards';
import { ToppingsLoadedGuard } from './toppings.guards';

export const guards = [
	PizzasLoadedGuard,
	PizzaExistsGuard,

	ToppingsLoadedGuard
];

export * from './pizza.guards';
export * from './toppings.guards';
