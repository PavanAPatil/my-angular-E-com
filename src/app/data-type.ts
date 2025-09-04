export interface signUp{
    name:string,
    password:string
    email:string,
    
}
export interface login{
    email:string,
    password:string
}
export interface product{
[x: string]: any
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined | number,
    productid:undefined | number

}
export interface cart
{
    [x: string]: any
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number | undefined
    quantity:undefined | number,
    userid:number,
    productId:number

}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number

}
export interface order
{
    email:string,
    address:string,
    contact:number,
    totalPrice:number,
    userId:number,
    id:number| undefined
}