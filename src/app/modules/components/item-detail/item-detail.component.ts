import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BidData } from 'src/app/models/bid-data.model';
import { Item } from 'src/app/models/item/item.model';
import { UserItem } from 'src/app/models/item/user-item.model';
import { UserConfig } from 'src/app/models/user/user-config';
import { User } from 'src/app/models/user/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  id: number;
  item: Item;
  countdownConfig: Object;
  daysLeft: number;
  maxBid: BidData;
  user: User;
  userItem: UserItem;
  userConfig: UserConfig;
  isItemSoldOut: boolean = false;

  bidForm = new FormGroup({
    price: new FormControl(null, [Validators.required]),
    autoBid: new FormControl(false,)
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    if (this.id) {
      this.getUser();

      Promise.all([this.getItem(), this.getUserItem(), this.getUserConfig(), this.getMaxBidItem()]).then((response) => {
        this.item = response[0];
        this.userItem = response[1];
        this.userConfig = response[2];
        this.maxBid = response[3];
        if (!this.maxBid) {
          this.maxBid = new BidData();
          this.maxBid.price = this.item.price;
        }

        if (this.userItem) {
          (this.userItem.isAutoBid) ? this.bidForm.controls['price'].disable({ onlySelf: true }) : this.bidForm.controls['price'].enable({ onlySelf: true });
          this.bidForm.controls['autoBid'].setValue(this.userItem.isAutoBid);
        }

        this.setCountdownConfig();
      });
    }
  }

  private getUser(): void {
    this.user = this.userService.getUser().user;
  }

  private getItem(): Promise<Item> {
    return this.itemService.getItemsById(this.id);
  }

  private getUserConfig(): Promise<UserConfig> {
    return this.userService.getUserConfig(this.user.id);
  }

  private getMaxBidItem(): Promise<BidData> {
    return this.itemService.getMaxBidItem(this.id);
  }

  private getUserItem(): Promise<UserItem> {
    return this.itemService.getUserItem(this.user.id, this.id);
  }

  private updateAutoBid(): void {
    if (!this.userItem) {
      this.userItem = new UserItem()
      this.userItem.itemId = this.id;
      this.userItem.userId = this.user.id;
    }
    this.userItem.isAutoBid = this.bidForm.value.autoBid;
    this.itemService.updateUserItem(this.userItem).then(response => {
      this.userItem = response;
      // notify
    }).catch(error => { });
  }

  private setCountdownConfig(): void {
    const leftTime = new Date(this.item.closingTime).getTime() - new Date().getTime();
    this.isItemSoldOut = (leftTime < 0) ? true : false;
    const miliSeconds = leftTime % 86400000;
    this.daysLeft = Math.floor(leftTime / 86400000);
    let format = (this.daysLeft > 0) ? 'H' : 'H:m:s';
    this.countdownConfig = { leftTime: miliSeconds, format: format };
  }

  onChangeBid(): void {
    if (this.maxBid && this.maxBid.userId === this.user.id) {
      // are you sure?
    }
    if (this.bidForm.valid && this.validate()) {
      const bid = new BidData();
      bid.itemId = this.id;
      bid.price = this.bidForm.value.price;
      bid.userId = this.user.id;
      bid.time = new Date();
      this.itemService.addNewBid(bid).then(response => {
        this.getMaxBidItem().then(maxBid => {
          this.maxBid = maxBid;
        });
      });
    }
  }

  private validate(): boolean {
    return (this.maxBid) ? (this.bidForm.value.price >= this.maxBid.price + 1) : (this.bidForm.value.price > this.item.price + 1);
  }

  onChangeAutoBid(): void {
    this.updateAutoBid();
    (this.userItem.isAutoBid) ? this.bidForm.controls['price'].disable({ onlySelf: true }) : this.bidForm.controls['price'].enable({ onlySelf: true });
  }

}
