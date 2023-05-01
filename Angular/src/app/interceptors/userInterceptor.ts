import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  private AUTH_HEADER: string = "user-request";
  private userName: string = "jocelyn.miranda";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let nRequest = req.clone({
      headers: req.headers.append(this.AUTH_HEADER, this.userName)
    });
    return next.handle(nRequest);
  }

}
