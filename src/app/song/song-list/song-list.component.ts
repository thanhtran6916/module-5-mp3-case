import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from '../../model/song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  private subscription: Subscription;

  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.subscription = this.songService.findAll().subscribe(data =>{
      this.songs = data;
    }, error => console.log(error.message));
  }

}
