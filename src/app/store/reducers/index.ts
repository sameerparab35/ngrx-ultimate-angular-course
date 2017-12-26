import {
    ActivatedRouteSnapshot,
    Params,
    RouterStateSnapshot
} from '@angular/router';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouterStore from '@ngrx/router-store';

export interface IRouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface IAppState {
    routerReducer: fromRouterStore.RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IAppState> = {
    routerReducer: fromRouterStore.routerReducer
};

export const routerStateSelector = createFeatureSelector<
    fromRouterStore.RouterReducerState<IRouterStateUrl>
>('routerReducer');

export class CustomSerializer
    implements fromRouterStore.RouterStateSerializer<IRouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }

        const { params } = state;

        return { url, queryParams, params };
    }
}
