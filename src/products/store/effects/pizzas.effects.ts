import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { DbService } from '../../services';

import { Pizza } from '../../models/pizza.model';

import * as fromActions from '../actions';

@Injectable()
export class PizzasEffects {
    constructor(private actions$: Actions, private dbService: DbService) {}

    @Effect()
    loadPizzas$ = this.actions$
        .ofType(fromActions.LOAD_PIZZAS)
        .pipe(
            switchMap(_ => this.dbService.getPizzas()),
            map(
                (pizzas: Array<Pizza>) =>
                    new fromActions.LoadPizzasSuccess(pizzas)
            ),
            catchError(error => of(new fromActions.LoadPizzasFail(error)))
        );
}
