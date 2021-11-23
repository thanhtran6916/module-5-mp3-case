import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  private subscription: Subscription;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.subscription = this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
    }, error => console.log(error.message));
  }

}
