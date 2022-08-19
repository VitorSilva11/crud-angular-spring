import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = 'api/course'

  constructor(private httpClient: HttpClient) { }


  findAll(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      tap(courses => console.log(courses))
    );
  }

  findById(id: string){
    return this.httpClient.get<Course>(this.API + "/" + id).pipe(first());
  }

  save(record: Partial<Course>){

    return this.httpClient.post<Course>(this.API, record).pipe(first());

  }

  update(course:Course){
    return this.httpClient.put<Course>(this.API, course).pipe(first());
  }

  remove(id: string){

    return this.httpClient.delete<Course>(this.API + "/" + id).pipe(first());

  }



}
