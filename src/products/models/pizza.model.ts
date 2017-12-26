import { Topping } from '../models/topping.model';

// todo: rename IPizza
export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}

export interface IPizzaEntities {
	[id: number]: Pizza
}
