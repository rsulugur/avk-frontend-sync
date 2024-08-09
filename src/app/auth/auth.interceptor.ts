import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = sessionStorage.getItem('X-Auth-Token');

        if (authToken) {
            const cloned = req.clone({
                headers: req.headers.set('X-Auth-Token', authToken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
