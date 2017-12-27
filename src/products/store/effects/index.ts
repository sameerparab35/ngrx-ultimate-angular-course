import { PizzasEffects } from './pizzas.effects';
import { ToppingsEffects } from './toppings.effects';

export * from './pizzas.effects';
export * from './toppings.effects';

export const effects = [PizzasEffects, ToppingsEffects];
