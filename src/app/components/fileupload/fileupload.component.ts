import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgToastService } from 'ng-angular-popup';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { DataService } from 'src/app/shared/data.service';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;

  listOfFiles : FileMetaData[] = [];

  constructor(private fileService:FileService, private data : DataService, private filestorage:AngularFireStorage,
    private fireStore:AngularFirestore , private toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllFiles()
  }

  selectFile(event:any){
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
    this.currentFileUpload = new FileMetaData(this.selectedFiles[0])
    const path = '/Upload'+this.currentFileUpload.file.name;

    const storageRef = this.filestorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0])

    uploadTask.snapshotChanges().pipe(finalize(()=>{
      storageRef.getDownloadURL().subscribe(downloadLink =>{
        this.currentFileUpload.url = downloadLink,
        this.currentFileUpload.size = this.currentFileUpload.file.size;
        this.currentFileUpload.name = this.currentFileUpload.file.name;

        this.fileService.saveDataOfFile(this.currentFileUpload);  
        
      })
    })
    ).subscribe((res:any)=>{
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes)
      this.toast.success({detail:"" , summary: "File Uploaded", duration:2000})
    }, err =>{
      console.log("Error Occured")
    })
  }

  getAllFiles(){
    this.fileService.getAllFiles().subscribe (res=>{
      this.listOfFiles = res.map((e : any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data
      })
    },err=>{
      console.log("Error occured while fetching files")
    })
  }

  deleteFile(file: FileMetaData){
    if(window.confirm('Are you sure you want to delete '+file.name   + '?')){
    this.fileService.deleteFiles(file);
    this.toast.warning({detail:"" , summary: "File Deleted", duration:2000})
    this.ngOnInit();
    }
  }
}
