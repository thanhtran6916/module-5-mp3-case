import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from '../../model/song';
import {SongService} from '../../service/song.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-song-delete',
  templateUrl: './song-delete.component.html',
  styleUrls: ['./song-delete.component.css']
})
export class SongDeleteComponent implements OnInit {

  private subscription: Subscription;

  song: Song = {};

  constructor(private songService: SongService,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('id');
      this.findById(id);
    })
  }

  findById(id: number) {
    this.subscription = this.songService.findById(id).subscribe(data => {
      this.song = data;
    }, error => console.log(error.message));
  }

  deleteSong(id: number) {
    this.subscription = this.songService.deleteSong(id).subscribe(data => {
      this.song = data;
      this.router.navigate(['/songs/list']);
    }, error => console.log(error.message));
  }

}
