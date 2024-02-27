import {
    HttpEvent,
    HttpRequest,
    HttpInterceptorFn,
    HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const accessTokenLabel = environment.accessTokenLabel;
    const accessToken = localStorage.getItem(accessTokenLabel);

    if (accessToken) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return next(req);
};
