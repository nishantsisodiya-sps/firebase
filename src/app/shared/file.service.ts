import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetaData } from '../model/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore , private fireStorage:AngularFireStorage) { }


  //Save meta data to file

  saveDataOfFile(fileObj : FileMetaData){


    const fileMeta = {
      id : '',
      name : fileObj.name,
      url : fileObj.url,
      size : fileObj.size
    }

    fileMeta.id = this.fireStore.createId();
    this.fireStore.collection('/Upload').add(fileMeta)

  }

  //display all Files
  getAllFiles(){
    return this.fireStore.collection('/Upload').snapshotChanges();
  }

  deleteFiles(fileMeta : FileMetaData){
    this.fireStore.collection('/Upload').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Upload'+fileMeta.name).delete();
    
  }
}
