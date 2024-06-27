import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BookTop } from '../interfaces/top.interface';

@Injectable({
  providedIn: 'root'
})
export class TopService {

  private readonly topUrl: string = `${environments.API_URL}/order`;

  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  private _top5: BehaviorSubject<BookTop[]> = new BehaviorSubject<BookTop[]>([]);

  constructor() { }

  public getTop(): Observable<boolean> {
    const url: string = `${this.topUrl}/top`;
    const headers = this.authService.setHeaders();
    return this.httpClient.get<BookTop[]>(url, { headers }).pipe(
      map(top5 => {
        this._top5.next(top5);
        return true;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public top5(): Observable<BookTop[]> {
    return this._top5.asObservable();
  }

}
