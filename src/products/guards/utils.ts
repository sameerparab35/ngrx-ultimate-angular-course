import { filter, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export function waitForLoaded(
    isLoadedFn: () => Observable<boolean>,
    loadFn: Function
): Observable<boolean> {
    return isLoadedFn().pipe(
        tap(loaded => {
            if (!loaded) {
                loadFn();
            }
        }),
        filter(loaded => loaded),
        take(1)
    );
}

