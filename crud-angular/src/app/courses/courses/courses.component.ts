import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;


  displayedColumns = ['_id','name', 'category', 'actions'];

  constructor(
    private serviceCourse: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) {
    this.courses$ = this.serviceCourse.findAll()
    .pipe(

      catchError(error => {
        this.onError('Erro ao Carregar Cursos')
          return of([])
      })
    );
  }

  onError(msg:string){
      this.dialog.open(ErrorDialogComponent, {
        data: msg
      });
  }


  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit/' + course._id], {relativeTo: this.route});
  }

  onRemove(course: Course){
    this.serviceCourse.remove(course._id).subscribe((result) => {
      this.courses$ = this.serviceCourse.findAll()
      .pipe(
  
        catchError(error => {
          this.onError('Erro ao Carregar Cursos')
            return of([])
        })
      );
    });
  }

}
