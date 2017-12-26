import { Injectable } from '@angular/core';

import { DbService } from './db.service';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
    constructor(private dbService: DbService) {}

    getPizzas() {
        return this.dbService.getPizzas();
    }

    createPizza(payload: Pizza) {
        return this.dbService.createPizza(payload);
    }

    updatePizza(payload: Pizza) {
        return this.dbService.updatePizza(payload);
    }

    removePizza(payload: Pizza) {
        return this.dbService.removePizza(payload);
    }
}
