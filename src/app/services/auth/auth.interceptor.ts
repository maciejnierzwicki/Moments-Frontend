import { HttpRequest, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage/token-storage.service';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private tokenService: TokenStorageService;
	private authService: AuthService;
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(tokenService: TokenStorageService, authService: AuthService) {
		this.tokenService = tokenService;
		this.authService = authService;
	}


	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let url = req.url.toLowerCase();
		
		// ignore requests to /signup and /signin
		if(url.includes('/signup') || url.includes('/signin')) {
			return next.handle(req);
		}
		// get request
		let authReq = req;
		// get token
		const token = this.tokenService.getToken();
		// add token to header
		if (token != null) {
			authReq = this.addTokenHeader(req, token);
		}
		
		// skip if url is like below
		if(url.includes('/posts/new')) {
			return next.handle(authReq);
		}
		
		return next.handle(authReq).pipe(catchError(error => {
		  if (error instanceof HttpErrorResponse && error.status === 401) {
			return this.handle401Error(authReq, next);
		  }

		  return throwError(error);
		}));
		return next.handle(authReq);
	}
	
	private addTokenHeader(request: HttpRequest<any>, token: string) {
		return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
	}
	

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);
            
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenService.signOut();
            return throwError(err);
          })
        );
		}
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token: string) => next.handle(this.addTokenHeader(request, token)))
    );
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
