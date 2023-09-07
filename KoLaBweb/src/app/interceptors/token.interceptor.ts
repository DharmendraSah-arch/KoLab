import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/core/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, ɵafterNextNavigation } from '@angular/router';
import { TokenModel } from 'src/core/model/token.api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private toast:NgToastService, private rout:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken= this.auth.getToken();
    if(myToken){
       request=request.clone({
       setHeaders: {Authorization:`Bearer ${myToken}`} // Bearer "myToken"
      })  
   }
    return next.handle(request).pipe(
    catchError((err:any)=>{
    if(err instanceof HttpErrorResponse){
    if(err.status===401)
    {
    //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again", duration:5000});
    //this.rout.navigate(["authunticate/login"]) 
    this.handleUnAuthorizedError(request, next);
    }
    }
    return throwError(()=> new Error("Some other error occured"))
  })
  );
  }
  
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokenModel = new TokenModel();
    tokenModel.accessToken = this.auth.getToken()!;
    tokenModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenModel)
    .pipe(
      switchMap((data:TokenModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
          this.rout.navigate(["authunticate/login"]) 
        })
      })
    )
  }
}


