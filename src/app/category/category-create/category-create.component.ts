import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  subscription: Subscription;

  categoryForm = new FormGroup({
    name: new FormControl()
  })

  category: Category = {};

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
  }

  createCategory() {
    this.category = this.categoryForm.value;
    this.subscription = this.categoryService.save(this.category).subscribe(data => {
      this.category = data;
      this.router.navigate(['/categories/list']);
    }, error => console.log(error.message));
  }

}
