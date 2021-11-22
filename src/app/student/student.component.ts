import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { IStudent } from '../appModels/student.model';
import { StudentService } from '../appService/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  batchName : string[] = ["Angular","React","Python"]
  studForm :  any;
  editMode : boolean = false;
  display = "none";
  student: IStudent[] = [];
  //showModal : boolean = false;
  // editModeButton :string ="";
  
  
  constructor(private fb : FormBuilder, private studService : StudentService) { }
  @ViewChild("sname") myName: ElementRef<HTMLInputElement>| any;

  ngOnInit(): void 
  {
    this.onGetStudent();
    this.studForm = this.fb.group({
      _id : [''],
      name : ['', [Validators.required, Validators.pattern('[a-z A-Z]*')]],
      batch : [''],
      fees : ['', [Validators.required]]
    })
  }
  
  onGetStudent()
  {
    this.studService.getStudentList().subscribe(res => this.student = res)
  }
  ngAfterViewInit()
  {
    this.myName.nativeElement.focus();
  }
  onSubmitStudent()
  {
    if (this.studForm.valid){
      // console.log(this.studForm.value);
      if(this.editMode){
        this.studService.updateStudent(this.studForm.value).subscribe(
          (res) => { console.log(res); 
            this.onGetStudent();
          },
          (err) => { console.log(err); }
        );  
      }
      else{
        this.studService.addStudent(this.studForm.value).subscribe(
          (res) => { console.log(res); 
            this.onGetStudent();
          },
          (err) => { console.log(err); }
        );  
      }

      this.studForm.reset();
      this.onCloseModal();
    }
    // else{
    //   let key = Object.keys(this.studForm.controls);
    //   key.filter(data => {
    //     let control = this.studForm.controls[data];
    //     if(control.error!==null)
    //     { control.markAsTouched() } 
    //   })
    // }
  }

  onEditStudent(stud: any)
  {
    this.display = "block";
    this.editMode = true;
    this.studForm.patchValue(stud);
  }
  
  onDeleteStudent(id: any)
  {
    if(confirm('Do you want Delete this Student'))
    {
      this.studService.deleteStudent(id).subscribe(  
        (res) => { console.log("Deleted Student Record"); 
        this.onGetStudent();
        },
        (err) => { console.log(err); })
    }
   
  }

  onAddStudent()
  {    
    if(this.editMode == false)
    {
      this.studForm.reset();
      this.display = "block";
    }
  }
  onCloseModal()
  {
    this.display = "none";
    this.editMode = false;
  }
}
