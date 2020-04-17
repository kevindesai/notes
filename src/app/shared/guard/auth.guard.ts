import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from '../services/index'


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private commonService: CommonService) {}

    /**
     * Determines whether activate can retur true or false basd on login or not
     * @returns  
     */
    canActivate() {
        console.log('guard',this.commonService.getLocalStorage('isLoggedIn'))
        if (this.commonService.getLocalStorage('isLoggedIn') == 'true') {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
