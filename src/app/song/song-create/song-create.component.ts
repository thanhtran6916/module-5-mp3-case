import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../model/song';
import {Category} from '../../model/category';
import {SongService} from '../../service/song.service';
import {CategoryService} from '../../service/category.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-create',
  templateUrl: './song-create.component.html',
  styleUrls: ['./song-create.component.css']
})
export class SongCreateComponent implements OnInit {

  private subscription: Subscription;

  songForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(4),
      Validators.required
    ]),
    singer: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl(null, [
      Validators.required
    ]),
    file: new FormControl()
  })

  song: Song = {};

  categories: Category[];

  uploadForm: FormGroup;

  fileSongs: any = [];

  fileSong: any;

  constructor(private songService: SongService,
              private categoryService: CategoryService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.findAllCategory();
  }

  findAllCategory() {
    this.subscription = this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    }, error => console.log(error));
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileSong = event.target.files[0];
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  createProduct() {
    const formData = new FormData();
    // formData.append('file', this.uploadForm.get('profile').value);

    formData.append('files', this.fileSong);
    formData.append('name', this.songForm.get('name').value);
    formData.append('singer', this.songForm.get('singer').value);
    formData.append('category', this.songForm.get('category').value);
    this.subscription = this.songService.save(formData).subscribe(data => {
      this.song = data;
      this.router.navigate(['/songs/list']);
      // let toast = new Toast();
      // toast.toastSuccess();
    }, error => console.log(error));
  }

  get name() {
    return this.songForm.get('name');
  }

  get singer() {
    return this.songForm.get('singer');
  }

  get category() {
    return this.songForm.get('category');
  }

}
