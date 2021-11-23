import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from '../../model/song';
import {SongService} from '../../service/song.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit {

  private subscription: Subscription;

  song: Song = {};

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('id');
      this.findById(id);
    }, error => console.log(error.message));
  }

  findById(id: number) {
    this.subscription = this.songService.findById(id).subscribe(data => {
      this.song = data;
    }, error => console.log(error.message));
  }

}
