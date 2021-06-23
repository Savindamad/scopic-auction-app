import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<Item> = [];
  pageNo: number = 3;
  itemsCount: number = 130;
  pageSize: number = 12;
  sortOptions: Array<string> = ['Default', 'Price Low to High', 'Price High to Low'];
  selectedSortOption: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectedSortOption = this.sortOptions[0];

    this.items.push(
      { id: 1, name: 'Item 1', closingTime: new Date(), description: 'The process of writing a job description requires having a clear understanding of the job’s duties and responsibilities. The job posting should also include a concise picture of the skills required for the position to attract qualified job candidates. Organize the job description into five sections: Company Information, Job Description, Job Requirements, ', imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png', price: 2345.14 },
      { id: 2, name: 'Long Item Name - ABC snkds knknad afafaflnafn', closingTime: new Date(), description: 'des 2', imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png', price: 1345.24 },
      { id: 3, name: 'Item 3', closingTime: new Date(), description: 'des 3', imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png', price: 4345.54 },
      { id: 4, name: 'Item 4', closingTime: new Date(), description: 'des 4', imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png', price: 1245.56 },
      { id: 5, name: 'Item 5', closingTime: new Date(), description: 'des 5', imageURL: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png', price: 2123.89 }
    );
  }

  changeSort(option: string): void {
    if (option === 'Default') {
      // todo
    }
    else if (option === 'Price Low to High') {
      // todo
    }
    else if (option === 'Price High to Low') {
      // todo
    }
  }

  onPageChange(): void {
    console.log(this.pageNo);
  }

  onClickBid(id: number): void {
    this.router.navigate(['item', id]);
  }


}
