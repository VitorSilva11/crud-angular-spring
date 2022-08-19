import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, first, Observable, tap } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  private id = ''
  public edit:boolean;

  private name: string = '';
  private category: string = '';

  public course:Course = {
    _id: '',
    name: '',
    category: ''
  };
  


  form = this.formBuilder.group({
    name: [''], 
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.id = params['id'])

      this.edit = false;

      if(this.id){
        this.service.findById(this.id).subscribe((data) => {
          this.form.setValue({
            name: data.name,
            category: data.category
          });
        })

        this.edit = true;
      }

      
   }

  ngOnInit(): void {

  }

  onSubmit(){

    this.service.save(this.form.value).subscribe(result => this.OnSuccess(), error => this.onError());

  }

  onEdit(){

   this.course.name = this.form.value.name
   this.course.category = this.form.value.category
   this.course._id = this.id;
    
   console.log(this.course)
    
    this.service.update(this.course).subscribe(result => this.OnSuccess(), error => this.onError())
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