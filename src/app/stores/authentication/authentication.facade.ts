import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './authentication.reducer';

@Injectable({ providedIn: 'root' })
export class AuthenticationFacade {
  constructor(private store$: Store<State>, private http: HttpClient) {}
}
