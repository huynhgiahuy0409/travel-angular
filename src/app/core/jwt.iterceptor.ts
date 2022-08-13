import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../user/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class JWTInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwt = this.authService.JWTBSub.value
        if(jwt){
            const cloned = req.clone({
                headers: req.headers.set("Authorization", 'Bearer ' + jwt.accessToken)
            })
            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }
}