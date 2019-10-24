import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()

export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }

}