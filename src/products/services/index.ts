import { PizzasService } from './pizzas.service';
import { ToppingsService } from './toppings.service';
import { DbService } from './db.service';

export const services = [
	PizzasService,
	ToppingsService,
	DbService
];

export * from './pizzas.service';
export * from './toppings.service';
export * from './db.service';
