import { Component, OnInit } from '@angular/core';
import {ItemList} from '../model/item-list.model';
import {Item} from '../model/item-list.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public itemList: ItemList = new ItemList();
  dataCart: Item[] = this.itemList.items;
  totalShop = 0;
  money = 1000;
  displayedColumns: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource(this.dataCart);
  result = '';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource.filter = 'true';
    
  }
  addToCart(index: number) {
    this.dataCart[index].addedToCart = true;
    this.calculateCart(this.dataCart[index].price);
    this.dataSource.filter = 'true';
  }

  removeCart(index: number) {
    this.dataCart[index].addedToCart = false;
    this.calculateCart(-this.dataCart[index].price);
    this.dataSource.filter = 'true';
  }

  calculateCart(price: number) {
   this.totalShop = this.totalShop + price;
   console.log('Total Belanja ' + this.totalShop);
  }

  purchase() {
    if (this.money < this.totalShop) {
      this.result = 'You dont have enough gold';
    } else {
      if(this.totalShop == 0) {
        this.result = "Please buy something";
      } else {
        this.result = 'Transaction success !';
      }
    }
    this.snackBar.open(this.result, 'OK', {duration: 2000});
  }

}
