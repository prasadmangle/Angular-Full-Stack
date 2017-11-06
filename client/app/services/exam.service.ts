import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExamService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getExams(): Observable<any> {
    return this.http.get('/api/exams').map(res => res.json());
  }

  countExams(): Observable<any> {
    return this.http.get('/api/exams/count').map(res => res.json());
  }

  addExam(exam): Observable<any> {
    console.log(JSON.stringify(this.options));
    return this.http.post('/api/exam', JSON.stringify(exam), this.options);
  }

  getExam(exam): Observable<any> {
    return this.http.get(`/api/exam/${exam._id}`).map(res => res.json());
  }

  editExam(exam): Observable<any> {
    return this.http.put(`/api/exam/${exam._id}`, JSON.stringify(exam), this.options);
  }

  deleteExam(exam): Observable<any> {
    return this.http.delete(`/api/exam/${exam._id}`, this.options);
  }
}
