import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];
  pageNo: number = 1;
  itemsCount: number = 0;
  pageSize: number = 10;
  sortOptions: Array<string> = ['Price Low to High', 'Price High to Low'];
  selectedSortOption: string;
  searchText = new FormControl('');

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.selectedSortOption = 'None';
    this.getItems();
  }

  private getItems(text?: string): void {
    this.itemService.getItems(this.pageNo, this.pageSize, text).then(response => {
      this.itemsCount = response.count;
      this.items = response.items;
    });
  }

  onSearch(): void {
    if (this.searchText.value != '') {
      this.getItems(this.searchText.value);
    }
  }

  onChangeSort(option: string): void {
    this.selectedSortOption = option;
    if (option === 'Price Low to High') {
      this.items = this.items.sort((a, b) => a.price - b.price);
    }
    else if (option === 'Price High to Low') {
      this.items = this.items.sort((a, b) => b.price - a.price);
    }
  }

  onPageChange(): void {
    this.getItems();
  }

  onClickBid(id: number): void {
    this.router.navigate(['item', id]);
  }


}
