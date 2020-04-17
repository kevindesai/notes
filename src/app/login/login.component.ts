import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:any={};
  constructor(private commonService:CommonService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  /** check if user is already loggedin */
  console.log(this.commonService.getLocalStorage("isLoggedIn"));
    if(this.commonService.getLocalStorage("isLoggedIn") == 'true'){
      //Redirect to notes page
      this.router.navigate(['notes']);
    }
  }

  doLogin(loginFrm){
    if(this.login.email.trim() !== '' && this.login.password.trim() !== ''){
        if(this.login.email === 'demo@demo.com' && this.login.password === 'demo'){
          console.log("a");
          this.commonService.setLocalStorage("isLoggedIn",'true');
          console.log(this.commonService.getLocalStorage("isLoggedIn"));
          setTimeout(() => {
            this.router.navigate(['notes']);  
          });
          
        }else{
          setTimeout(() => {
            this.toastr.error('Invalid email or password!', 'Error!');
          }); 
        }
    }else{
      setTimeout(() => {
        this.toastr.error('Please provide email and password!', 'Error!');  
      });
      
    }
  }

}
