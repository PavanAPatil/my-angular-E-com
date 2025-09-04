import { Component, OnInit } from '@angular/core';
import { signUp, login, product, cart } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService,private product:ProductService) {}

  ngOnInit(): void {
    this.user.userAuthreload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  Login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn('apple', result);
      if (result) {
        this.authError = 'Please enter valid details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
     let user = localStorage.getItem('user');
      let userid = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
     

      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userid,
        };

        delete cartData.id;
         setTimeout(() => {
           this.product.AddToCart(cartData).subscribe((result) => {
             if (result) {
               console.warn("item store in DB");
             }
           })
           if(cartDataList.length===index+1)
           {
             localStorage.removeItem('localCart');
           }

         }, 500);
      });
    }
     setTimeout(() => {
          this.product.getCartList(userid)
     }, 2000);
  }
}
