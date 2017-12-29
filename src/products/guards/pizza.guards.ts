import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { PizzasService } from '../services';
import * as fromUtils from './utils';

@Injectable()
export class PizzasLoadedGuard implements CanActivate {
    constructor(private pizzasService: PizzasService) {}

    canActivate(): Observable<boolean> {
        return this.waitForLoaded().pipe(catchError(() => of(false)));
    }

    waitForLoaded(): Observable<boolean> {
        return fromUtils.waitForLoaded(
            this.pizzasService.arePizzasLoaded.bind(this.pizzasService),
            this.pizzasService.loadPizzas.bind(this.pizzasService)
        );
    }
}

@Injectable()
export class PizzaExistsGuard implements CanActivate {
    constructor(private pizzasService: PizzasService) {}

    canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
        return this.waitForLoaded().pipe(
            switchMap(() => {
                const pizzaId = parseInt(routeSnapshot.params.pizzaId, 10);
                return this.pizzaExists(pizzaId);
            }),
            catchError(() => of(false))
        );
    }

    waitForLoaded(): Observable<boolean> {
        return fromUtils.waitForLoaded(
            this.pizzasService.arePizzasLoaded.bind(this.pizzasService),
            this.pizzasService.loadPizzas.bind(this.pizzasService)
        );
    }

    pizzaExists(pizzaId: number): Observable<boolean> {
        return this.pizzasService
            .getPizzaEntities()
            .pipe(map(entities => !!entities[pizzaId]));
    }
}
