import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpUtilService } from '../http-utils/http-util-service.service';

@Injectable({
  providedIn: 'root',
})
export class GuardsService implements CanActivate {
  constructor(private router: Router, private httpUtils: HttpUtilService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.httpUtils.token != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
