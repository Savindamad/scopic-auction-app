import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BidData } from '../models/bid-data.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItems(): Promise<Array<Item>> {
    const method = environment.api + 'get-items';
    return this.http.get<Array<Item>>(method).toPromise();
  }

  getItemById(id: number): Promise<Item> {
    const method = environment.api + 'get-items/' + id;
    return this.http.get<Item>(method).toPromise();
  }

  getMaxBid(id: number): Promise<BidData> {
    const method = environment.api + 'max-bid/' + id;
    return this.http.get<BidData>(method).toPromise();
  }
}
