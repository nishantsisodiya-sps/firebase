import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Student } from 'src/app/model/students';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentList : Student[] = []
  studentObj : Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    contact: ''
  }
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  contact: string = '';
  student: any;

 
  constructor(private auth:AuthService, private router:Router, private data:DataService, private toast:NgToastService) {
    this.id 
    this.first_name
    this.last_name
    this.email
    this.contact  
   }

  ngOnInit(): void {
    this.getAllStudent();
  }

  logout(){
    this.auth.logOut();
    this.toast.info({detail:"" , summary: "Logged out successfully", duration:2000})
    this.router.navigate(['/login'])
  }

  getAllStudent(){
    this.data.getAllStrudents().subscribe(result =>{
      this.studentList = result.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      }, (_err : any)=>{
        alert ("Error while fetching student")
      })
    })
  }

  addStudent(){
    if(this.first_name == '' || this.last_name == '' || this.email == '' || this.contact == ''){
      alert("Please fill all input Fields")
    }
    this.studentObj.id = '';
    this.studentObj.first_name = this.first_name;
    this.studentObj.email = this.email;
    this.studentObj.last_name = this.last_name;
    this.studentObj.contact = this.contact;

    this.data.addStudents(this.studentObj);
    this.toast.success({detail:"New student" , summary: "Student added", duration:2000})
    this.resetForm(); 
  }

  resetForm(){
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.contact = '';
  }

  updateStudent(student:Student){
    console.log(student)
    // this.toast.info({detail:"" , summary: "Student Updated", duration:2000})
  }

  deleteStudent(student:Student){
    if(window.confirm('Are you sure ? You want to delete'+ student.first_name+' '+student.last_name+' ?'))
    this.data.deleteStudent(student);
    this.toast.warning({detail:"" , summary: "Student Deleted", duration:2000})

  }
}
