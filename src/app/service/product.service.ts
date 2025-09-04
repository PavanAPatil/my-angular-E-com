import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  currentCart() {
    throw new Error('Method not implemented.');
  }
  cartData=new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    return this.http.post(`http://localhost:5000/products`, data);
  }
  productlist() {
    return this.http.get<product[]>(`http://localhost:5000/products`);
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:5000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:5000/products/${id}`);
  }
  updateProduct(product: product) {
    console.warn(product);
    return this.http.put(
      `http://localhost:5000/products/${product.id}`, product );
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:5000/products?_limit=6');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:5000/products?_limit=8');
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:5000/products?=${query}`);
  }
  localAddTOCart(data: product) {
       let cartData=[];
       let localCart=localStorage.getItem('localCart');
       if(!localCart)
       {
          localStorage.setItem('localCart',JSON.stringify([data]));
          this.cartData.emit([data]);
       }
       else{
        cartData=JSON.parse(localCart);
        cartData.push(data)
        localStorage.setItem('localCart',JSON.stringify(cartData));
       }
       this.cartData.emit(cartData);
  }
  removeItemFromCart(productid:number){
      let cartData=localStorage.getItem('localCart');
      if(cartData)
      {
        let items: product[] = JSON.parse(cartData);
        items=items.filter((item:product)=>productid!==item.id);
        localStorage.setItem('localCart',JSON.stringify(items));
        this.cartData.emit(items);
      }
        
  }
  AddToCart(cartData:cart)
  {
    return this.http.post('http://localhost:5000/cart',cartData)
  }
  getCartList(userid:number)
  {
      return this.http.get<product[]>('http://localhost:5000/cart?userid='+userid,
        {observe:'response'}).subscribe((result)=>{
          if(result && result.body)
          {
            this.cartData.emit(result.body);
          }
          
        })
      }
      removeToCart(cartId:number)
      {
        return this.http.delete('http://localhost:5000/cart/'+cartId);
      }
      currentcart()
      {
        let userStore=localStorage.getItem('user');
       let userData=userStore && JSON.parse(userStore);
       return this.http.get<cart[]>('http://localhost:5000/cart?userId='+userData.id);
      }
      orderNow(data:order)
      {
        return this.http.post('http://localhost:5000/orders',data);
      }
      orderList()
      {
        let userStore=localStorage.getItem('user');
       let userData=userStore && JSON.parse(userStore);
        return this.http.get<order[]>('http://localhost:5000/orders?userid='+userData.id);
      }
      deleteCartItems(cartId:number)
      {
           return this.http.delete('http://localhost:5000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
            if(result)
            {
              this.cartData.emit([]);
            }
           })
      }
      cancelOrder(orderId:number)
      {
         return this.http.delete('http://localhost:5000/orders/'+orderId)
      }
    }


