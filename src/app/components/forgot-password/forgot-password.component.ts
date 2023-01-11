import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string = ''

  constructor(private auth:AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.auth.forgotPass(this.email);
    this.email = ''
  }

}
