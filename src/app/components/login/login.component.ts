import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password : string = ''

  constructor(private auth : AuthService , private toast:NgToastService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.email == ''){
      alert("Please Enter Email")
      return
    }
    if(this.password == ''){
      alert("Please Enter Password")
      return
    }

    this.auth.login(this.email , this.password);
    this.toast.success({detail:"Logged in" , summary: "Successfully Logged in", duration:2000})
    this.email = '';
    this.password = ''
  }

  signInWithGoogle(){
    this.auth.signInGoogle();
  }
}
