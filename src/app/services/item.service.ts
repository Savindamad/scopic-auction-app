import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BidData } from '../models/bid-data.model';
import { ItemList } from '../models/item/item-list.model';
import { Item } from '../models/item/item.model';
import { UserItem } from '../models/item/user-item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItems(pageNo: number, pageSize: number, searchText?: string): Promise<ItemList> {
    const method = environment.api + 'items';
    const params = (!searchText) ? { "pageNo": pageNo.toString(), "pageSize": pageSize.toString() } :
      { "pageNo": pageNo.toString(), "pageSize": pageSize.toString(), "searchText": searchText };
    return this.http.get<ItemList>(method, { params }).toPromise();
  }

  getItemsById(id: number): Promise<Item> {
    const method = environment.api + 'items/' + id;
    return this.http.get<Item>(method).toPromise();
  }

  getMaxBidItem(id: number): Promise<BidData> {
    const method = environment.api + `items/${id}/max-bid`;
    return this.http.get<BidData>(method).toPromise();
  }

  getUserItem(userId: number, itemId: number): Promise<UserItem> {
    const method = environment.api + `items/${itemId}/user-item`;
    return this.http.get<UserItem>(method, { params: { "userId": userId.toString() } }).toPromise();
  }

  updateUserItem(item: UserItem): Promise<UserItem> {
    const method = environment.api + 'items/user-item';
    return this.http.put<UserItem>(method, item).toPromise();
  }

  addNewBid(bid: BidData): Promise<boolean> {
    const method = environment.api + 'items/bid-item';
    return this.http.post<boolean>(method, bid).toPromise();
  }
}
