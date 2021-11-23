import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  private subscription: Subscription;

  categoryForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl()
  })

  category: Category = {};

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('id');
      this.findById(id);
    })
  }

  findById(id: number) {
    this.subscription = this.categoryService.findById(id).subscribe(data => {
      this.category = data;
      this.categoryForm = new FormGroup({
        id: new FormControl(this.category.id),
        name: new FormControl(this.category.name)
      })
    })
  }

  edit() {
    this.category = this.categoryForm.value;
    this.categoryService.edit(this.category.id, this.category).subscribe(data => {
      this.router.navigate(['/categories/list']);
    });
  }

}
