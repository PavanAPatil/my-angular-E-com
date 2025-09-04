import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType :string='default';
  sellerName:string='';
  searchResult:undefined|product[];
  userName:string="";
  cartItems=0
  constructor(private route: Router,private product:ProductService) {}

  ngOnInit(): void {
  
    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
        if(localStorage.getItem('seller') && val.url.includes('seller'))
        {
          console.warn("in seller area")
          this.menuType="seller";
          if(localStorage.getItem('seller'))
          {
             let sellerStore= localStorage.getItem('seller');
             let sellerData= sellerStore && JSON.parse(sellerStore)[0];
             this.sellerName= sellerData.name;
          }
        }
         else if(localStorage.getItem('user'))
          {
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType="user";
            this.product.getCartList(userData.id)
          }
            else 
        {
          let userData = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') as string);
          if(userData)
          {
            console.warn("not in seller area")
            this.menuType="default";
          }
          
        }
    }
  });
  // Add try-catch for JSON parsing above
  // If you want to handle JSON parsing errors, wrap the parsing code in try-catch:

  try {
    let userData = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') as string);
    if(userData) {
      console.warn("not in seller area")
      this.menuType="default";
    }
  } catch (e) {
    console.error("Invalid JSON in user storage:", e);
    localStorage.removeItem('user'); // clear corrupted data
  }
  let cartData=localStorage.getItem('localCart');
     if(cartData)
     {
       this.cartItems=JSON.parse(cartData).length;
     }
     this.product.cartData.subscribe((items)=>{
        this.cartItems=items.length;
     })
  }
  logout()
  {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);

  }
  userLogout()
  {
     localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
  searchProduct(_query: KeyboardEvent)
  {
    const query=(_query.target as HTMLInputElement).value;
    this.product.searchProduct(query).subscribe((result)=>{
        if(result.length>5)
        {
          result.length=5;
        }
      this.searchResult=result;
    })
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectTodetails(id:number)
  {
      this.route.navigate(['details/'+id])
  }
  submitSearch(val:string)
  {
      this.route.navigate([`/search/${val}`]);
  }
}
