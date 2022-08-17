import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  displayedColumns = ['_id','name', 'category'];

  constructor(
    private serviceCourse: CoursesService,
    public dialog: MatDialog
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

}
