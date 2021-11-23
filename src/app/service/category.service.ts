import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../model/category';

const URL = `${environment.URL_API}categories/`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(URL);
  }

  findById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(URL + id);
  }

  save(category: Category): Observable<Category> {
    return this.httpClient.post(URL, category);
  }

  edit(id: number, category: Category): Observable<Category> {
    return this.httpClient.put(URL + id, category);
  }

  delete(id: number): Observable<Category> {
    return this.httpClient.delete(URL + id);
  }

}
