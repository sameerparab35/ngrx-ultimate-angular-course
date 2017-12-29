import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as fromRouterActions from '../actions/router.actions';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect({ dispatch: false })
    navigate$ = this.actions$
        .ofType(fromRouterActions.GO)
        .pipe(
            map((action: fromRouterActions.Go) => action.payload),
            tap(({ path, queryParams, extras }) =>
                this.router.navigate(path, { queryParams, ...extras })
            )
        );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$
        .ofType(fromRouterActions.BACK)
        .pipe(tap(() => this.location.back()));

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$
        .ofType(fromRouterActions.BACK)
        .pipe(tap(() => this.location.forward()));
}
