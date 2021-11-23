import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {

  private subscription: Subscription;

  category: Category = {};

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = +paramMap.get('id');
      this.findById(id);
    }, error => console.log(error.message));
  }

  findById(id: number) {
    this.subscription = this.categoryService.findById(id).subscribe((data) => {
      this.category = data;
    }, error => console.log(error.message));
  }

}
