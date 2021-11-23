import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from '../../model/song';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  private subscription: Subscription;

  songForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    singer: new FormControl(),
    category: new FormControl(),
  })

  song: Song = {};

  categories: Category[];

  constructor(private songService: SongService,
              private categoryService: CategoryService,
              private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.findAllCategory();
    this.activateRouter.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('id');
      this.findSongById(id);
    })
  }

  findSongById(id: number) {
    this.subscription = this.songService.findById(id).subscribe(data => {
      this.song = data;
      this.songForm = new FormGroup({
        id: new FormControl(this.song.id),
        name: new FormControl(this.song.name),
        singer: new FormControl(this.song.singer),
        category: new FormControl(this.song.category.id)
      })
    })
  }

  findAllCategory() {
    this.subscription = this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    }, error => console.log(error.message));
  }

  editSong() {
    this.song = this.songForm.value;
    this.song.category = {
      id: this.song.category.id
    }
    this.subscription = this.songService.editSong(this.song.id, this.song).subscribe(data => {
      this.song = data;
    }, error => console.log(error.message));
  }

}
