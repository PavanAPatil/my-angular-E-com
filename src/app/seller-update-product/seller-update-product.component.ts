import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  productData: undefined | product;
  productMessage: undefined | string;
  ngOnInit(): void {
    let ProductId = this.route.snapshot.paramMap.get('id');
    console.warn(ProductId);
    ProductId &&
      this.product.getProduct(ProductId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
  }
  submit(data: product) {
    console.warn(data);
    if(this.productData)
    {
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'product updated sucessfully';
      }
      setTimeout(() => {
        this.productMessage = undefined;
      }, 4000);
    });
  }
}
