import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request.url.includes('boards') &&
      !request.url.includes('workspaces')
    ) {
      return next.handle(request);
    }

    return this.authService.getUserLoggedIn().pipe(
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }

        const newRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(newRequest);
      })
    );
  }
}
