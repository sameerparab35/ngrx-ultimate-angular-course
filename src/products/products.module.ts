import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

// store
import * as fromProductsStore from './store';

// routes
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [fromGuards.PizzasLoadedGuard],
        component: fromContainers.ProductsComponent
    },
    {
        path: 'new',
        canActivate: [fromGuards.ToppingsLoadedGuard],
        component: fromContainers.ProductItemComponent
    },
    {
        path: ':pizzaId',
        canActivate: [
            fromGuards.PizzaExistsGuard,
            fromGuards.ToppingsLoadedGuard
        ],
        component: fromContainers.ProductItemComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forFeature('products', fromProductsStore.reducers),
        EffectsModule.forFeature(fromProductsStore.effects),
        RouterModule.forChild(ROUTES)
    ],
    providers: [...fromServices.services, ...fromGuards.guards],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
