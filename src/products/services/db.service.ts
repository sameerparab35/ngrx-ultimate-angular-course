import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { IPizza } from '../models/pizza.model';
import { ITopping } from '../models/topping.model';

@Injectable()
export class DbService {
    private apiUrl = '/api';

    constructor(private http: HttpClient) {}

    // pizzas

    getPizzas() {
        return this.get<Array<IPizza>>('pizzas');
    }

    createPizza(payload: IPizza) {
        return this.post<IPizza>('pizzas', payload);
    }

    updatePizza(payload: IPizza) {
        return this.put<IPizza>(`pizzas/${payload.id}`, payload);
    }

    removePizza(payload: IPizza): Observable<IPizza> {
        return this.delete<any>(`pizzas/${payload.id}`);
    }

    // toppings

	getToppings() {
		return this.get<Array<ITopping>>('toppings');
	}

    private get<T>(target: string): Observable<T> {
        return this.http
            .get<T>(`${this.apiUrl}/${target}`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    private post<T>(target: string, data: T): Observable<T> {
        return this.http
            .post<T>(`${this.apiUrl}/${target}`, data)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    private put<T>(target: string, data: T): Observable<T> {
        return this.http
            .put<T>(`${this.apiUrl}/${target}`, data)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }

    private delete<T>(target: string): Observable<T> {
        return this.http
            .delete<T>(`${this.apiUrl}/${target}`)
            .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}
