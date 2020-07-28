import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = `${environment.baseAPIURL}api/${req.url}` //for contenate url
        const urlReq = req.clone({ url });

        return next.handle(urlReq).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 201) {
                    console.log(JSON.stringify(event, null, 2));
                    console.log(`Status Code: ${event.status}`);
                }
            },
                err => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401 || err.status === 403) {
                            this.authService.logout();
                            //this.authService.logout(); //comment this to bypass
                        }
                    }
                }
            ),
            delay(1000),
            finalize(() => {
                //todo
            }));
    }
}