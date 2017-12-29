import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromUtils from './utils';
import { ToppingsService } from '../services';

@Injectable()
export class ToppingsLoadedGuard implements CanActivate {
    constructor(private toppingService: ToppingsService) {}

    canActivate(): Observable<boolean> {
        return this.waitForLoaded().pipe(catchError(() => of(false)));
    }

    waitForLoaded(): Observable<boolean> {
        return fromUtils.waitForLoaded(
            this.toppingService.areToppingsLoaded.bind(this.toppingService),
            this.toppingService.loadToppings.bind(this.toppingService)
        );
    }
}
