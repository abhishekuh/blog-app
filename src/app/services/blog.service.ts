import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  APIUrl: String = 'http://localhost:9000';

  constructor(private http: HttpClient) {
  }

  getAllBlogs() {
    return this.http.get<Blog[]>(this.APIUrl + '/posts')
  }

  getBlogDetail(id: any) {
    return this.http.get<Blog[]>(this.APIUrl + '/posts/', { params: { id: id } })
  }

  getBlogComments(id: any) {
    return this.http.get(this.APIUrl + `/posts/${id}/comments`)
  }

  saveComment(data: any,id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };
    let apiData = JSON.stringify(data)
    return this.http.post(this.APIUrl + `/posts/${id}/comments`, apiData, httpOptions)
  }

}
