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
  private INTERCEPT_URLS = ['workspaces', 'boards'];

  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.INTERCEPT_URLS.find((url) => request.url.includes(url))) {
      return next.handle(request);
    }

    return this.authService.getUserLoggedIn().pipe(
      exhaustMap((user) => {
        if (!user || !user.token) {
          return null;
        }

        const newRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(newRequest);
      })
    );
  }
}
