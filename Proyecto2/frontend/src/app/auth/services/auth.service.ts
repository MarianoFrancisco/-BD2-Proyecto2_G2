import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environments } from '../../../environments/environments';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, throwError, timer } from 'rxjs';
import { AuthStatus, Register, Tokens, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authURL: string = `${environments.API_URL}/auth`;
  private readonly userURL: string = `${environments.API_URL}/user`;

  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);

  private _currentUser: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  private _isLoggedIn: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.Checking);

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private getToken(): string {
    return this.cookieService.get('token');
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

  private setAuth(user: User): void {
    this._currentUser.next(user);
    this._isLoggedIn.next(AuthStatus.Authenticated);
  }

  private processAuthRequest(request: Observable<Tokens>): Observable<boolean> {
    return request.pipe(
      switchMap(({ token, refreshToken }) => {
        this.cookieService.set('token', token);
        if (refreshToken) this.cookieService.set('refreshToken', refreshToken);
        return this.getUser();
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  private getUser(): Observable<boolean> {
    return this.httpClient.get<User>(this.userURL, { headers: this.setHeaders() })
    .pipe(
      map(user => {
        this.setAuth(user);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  public login(email: string, contrasenia: string): Observable<boolean> {
    const url: string = `${this.authURL}/login`;
    const request = this.httpClient.post<Tokens>(url, { email, contrasenia });
    return this.processAuthRequest(request);
  }

  public register(regData: Register): Observable<boolean> {
    const url: string = `${this.authURL}/register`;
    const request = this.httpClient.post<Tokens>(url, regData);
    return this.processAuthRequest(request);
  }

  public logout() {
    this._currentUser.next(null);
    this._isLoggedIn.next(AuthStatus.NotAuthenticated);
    this.cookieService.delete('token');
  }

  public checkAuthStatus(): Observable<boolean> {
    return timer(500).pipe(
      switchMap(() => {
        if (this.cookieService.check('token')) {
          return this.getUser();
        } else {
          this.logout();
          return of(false);
        }
      })
    );
  }

  public isLoggedIn(): Observable<AuthStatus> {
    return this._isLoggedIn.asObservable();
  }

  public currentUser(): Observable<User|null> {
    return this._currentUser.asObservable();
  }

}
