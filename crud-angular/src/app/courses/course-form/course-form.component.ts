import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''], 
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService, private snackBar: MatSnackBar, private location: Location) {
   }

  ngOnInit(): void {
  }

  onSubmit(){

    this.service.save(this.form.value).subscribe(result => this.OnSuccess(), error => this.onError());

  }

  onCancel(){
    this.location.back();
  }

  private onError(){
    this.snackBar.open("Error Ao Salvar!", '', {duration: 3000})
  }

  private OnSuccess(){
    this.snackBar.open("Salvo Com Sucesso!", '', {duration: 3000});
    this.onCancel();
  }

}
