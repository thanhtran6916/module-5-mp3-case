import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  private subscription: Subscription;

  category: Category = {};

  constructor(private categoryService: CategoryService,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(param => {
      let id = +param.get('id');
      this.findById(id);
    })
  }

  findById(id: number) {
    this.subscription = this.categoryService.findById(id).subscribe(data => {
      this.category = data;
    }, error => console.log(error.message));
  }

  delete(id: number) {
    this.subscription = this.categoryService.delete(id).subscribe(data => {
      this.category = data;
      this.router.navigate(['/categories/list']);
    }, error => console.log(error.message));
  }
}
