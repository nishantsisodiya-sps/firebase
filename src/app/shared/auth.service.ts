import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider , FacebookAuthProvider , GithubAuthProvider , PhoneAuthProvider} from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth : AngularFireAuth , private router:Router) { }

  // login method

  login(email : string , password : string){
    this.fireAuth.signInWithEmailAndPassword(email , password).then( res=>{
      localStorage.setItem('token' , 'true')
      
      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard'])
      }else{
        this.router.navigate(['/varify-email'])
      }


    }, err =>{
      alert("Something went wrong")
      this.router.navigate(['/login'])
    })
  }

  //Register Method

  register(email:string , password:string){
    this.fireAuth.createUserWithEmailAndPassword(email , password).then( res =>{
      this.router.navigate(['/login'])
      this.sendEmailForVarification(res.user);
    }, err=>{
      alert("something went wrong")
      this.router.navigate(['/register'])
    })
  }

  //sign out
  
  logOut(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }, err =>{
      alert(err.message)
    })
  }

  forgotPass(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/varify-email'])
    },err=>{
      alert("Something went wrong")
    })
  }

  sendEmailForVarification(user:any){
    user.sendEmailVerification().then((_res:any)=>{
      this.router.navigate(['/varify-email'])
    },(err:any)=>{
      alert("something went wrong")
    })
  }

  signInGoogle(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      this.router.navigate(['/dashboard'])
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    },err=>{
      alert(err.message)
    })

  }

  
}
