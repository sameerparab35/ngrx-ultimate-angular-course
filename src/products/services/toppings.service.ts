import { Injectable } from '@angular/core';

import { DbService } from './db.service';

@Injectable()
export class ToppingsService {
    constructor(private dbService: DbService) {}

    getToppings() {
        return this.dbService.getToppings();
    }
}
