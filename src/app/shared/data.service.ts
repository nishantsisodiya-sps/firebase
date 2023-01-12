import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/students';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  //Add students
  addStudents(student : Student){
    student.id = this.afs.createId(); 
    return this.afs.collection('/Students').add(student);
  }

  //Get all students
  getAllStrudents(){
    return this.afs.collection('/Students').snapshotChanges();
  }

  //Delete student
  deleteStudent(student : Student){
    return this.afs.doc('/Students/' + student.id).delete();
  }

  //Update student
  updateStudent(student:Student){
    this.deleteStudent(student);
    this.addStudents(student);
  }

}
