import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, order, product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  totalPrice:number|undefined;
 cartData: cart[] = [];
 orderMsg: string | undefined;
  constructor(private product: ProductService,private router: Router){}

  ngOnInit(): void{
     this.product.currentcart().subscribe((result)=>{
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quantity)
        {
          price=price+(+item.price*item.quantity)
        }
    });
    this.totalPrice=price+(price/10)+100-(price/10);
    console.warn(this.totalPrice);

  });

  }
  orderNow(data:{email:string,address:string,contact:number})
  {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice)
    {
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>
      {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 7000);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result)
        {
          this.orderMsg='Order Placed Successfully';
          //alert('Order Placed Successfully');
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined
          },4000);
        }
      })
    }
    
  }
}
