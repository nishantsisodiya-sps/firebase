import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';

const routes: Routes = [
  {path :'' , redirectTo:'/login' , pathMatch:'full'},
  {path:'login' , component: LoginComponent},
  {path: 'dashboard' , component:DashboardComponent},
  {path: 'register' , component:RegisterComponent},
  {path: 'forgot-password' , component:ForgotPasswordComponent},
  {path: 'varify-email' , component:VarifyEmailComponent},
  {path: 'fileUpload' , component:FileuploadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
