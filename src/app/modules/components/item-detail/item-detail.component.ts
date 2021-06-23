import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidData } from 'src/app/models/bid-data.model';
import { Item } from 'src/app/models/item.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  id: number;
  item: Item;
  countdownConfig: Object;
  daysLeft: number;
  maxBid: BidData;
  user: User;
  bidPrice: number;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.item = new Item();
      this.item.id = this.id;
      this.item.name = 'Test item name';
      this.item.description = 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.Donec sed odio dui.';
      this.item.imageURL = 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png';
      this.item.closingTime = new Date();

      this.user = new User();
      this.user.id = 1;

      this.maxBid = new BidData();
      this.maxBid.userId = 2;
      this.maxBid.price = 12.00;
      this.bidPrice = this.maxBid.price + 1;
      this.setCountdownConfig(17900000);
    });
  }

  setCountdownConfig(leftTime: number): void {
    const miliSeconds = leftTime % 86400000;
    this.daysLeft = Math.floor(leftTime / 86400000);
    let format = (this.daysLeft > 0) ? 'H' : 'H:m:s';
    this.countdownConfig = { leftTime: miliSeconds, format: format };

  }

  onChangeBid(): void {
    if (this.validate()) {
      // submit bid
    }
  }

  validate(): boolean {
    return (this.bidPrice > this.maxBid.price + 1) ? true : false;
  }

  onChangeAutoBid(): void {

  }

}
