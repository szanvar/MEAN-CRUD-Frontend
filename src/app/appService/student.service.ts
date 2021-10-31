import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { IStudent } from '../appModels/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  _url = "http://localhost:9000/students";

  // Add Student
  addStudent(stud: IStudent)
  {
    return this.http.post(this._url, stud);
  }

  // Display Student
  getStudentList(): Observable<IStudent[]>
  {
    return this.http.get<IStudent[]>(this._url);
  }

  // Update Student
  updateStudent(stud : IStudent)
  {
     return this.http.put(`${this._url}/${stud._id}`, stud)
  }

  // Delate Student
  deleteStudent(id: any)
  {
    return this.http.delete(`${this._url}/${id}`);
  }
}
