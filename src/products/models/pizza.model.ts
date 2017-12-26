import { ITopping } from '../models/topping.model';

export interface IPizza {
  id?: number;
  name?: string;
  toppings?: ITopping[];
}

export interface IPizzaEntities {
	[id: number]: IPizza
}
