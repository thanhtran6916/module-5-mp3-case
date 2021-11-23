import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Song} from '../model/song';

const URL_API = `${environment.URL_API}songs/`

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(URL_API);
  }

  findById(id: number): Observable<Song> {
    return this.httpClient.get<Song>(URL_API + id)
  }

  save(song: any): Observable<Song> {
    return this.httpClient.post<Song>(URL_API, song);
  }

  editSong(id: number, song: Song): Observable<any> {
    return this.httpClient.put<Song>(URL_API + id, song);
  }

  deleteSong(id: number): Observable<Song> {
    return this.httpClient.delete(URL_API + id);
  }
}
