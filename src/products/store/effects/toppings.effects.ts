import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { DbService } from '../../services';

import { ITopping } from '../../models/topping.model';

import * as fromActions from '../actions';

@Injectable()
export class ToppingsEffects {
    constructor(private actions$: Actions, private dbService: DbService) {}

    @Effect()
    loadToppings$ = this.actions$
        .ofType(fromActions.LOAD_TOPPINGS)
        .pipe(
            switchMap(() => this.dbService.getToppings()),
            map(
                (toppings: Array<ITopping>) =>
                    new fromActions.LoadToppingsSuccess(toppings)
            ),
            catchError(error => of(new fromActions.LoadToppingsFail(error)))
        );
}
