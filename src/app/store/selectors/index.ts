import * as fromRouterStore from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRouterStateUrl } from '../reducers';

export const selectRouter = createFeatureSelector<
    fromRouterStore.RouterReducerState<IRouterStateUrl>
>('routerReducer');

export const selectRouterState = createSelector(
    selectRouter,
    router => router.state
);
