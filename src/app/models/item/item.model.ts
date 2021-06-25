export class Item {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    closingTime: Date;
    maxBidUserItemId?: number;
}