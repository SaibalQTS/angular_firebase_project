import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productList : Product[]=[];
  productObj : Product ={
    id: '',
    name: '',
    price: '',
    offer_price: '',
    colours: ''
  };
  id : string ='';
  name :string='';
  price :string='';
  offer_price :string='';
  colours :string='';

  constructor(private auth:AuthService, private data :DataService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  register(){
    this.auth.logout();
  }
  
  getAllProduct(){
    this.data.getAllProduct().subscribe(res =>{
      this.productList =res.map((e:any) =>{
        const data = e.payload.doc.data();
        data.id =e.payload.doc.id;
        return data;
      })
    },err => {
      alert('Error while fetching the data')
    })
  }
resetForm(){
  this.id  ='';
  this.name ='';
  this.price ='';
  this.offer_price ='';
  this.colours ='';
}

addProduct(){
if(this.name == '' || this.price =='' || this.offer_price =='' || this.colours == ''){
  alert('Please Fill all the input fields');
  return;
}
 this.productObj.id='';
 this.productObj.name= this.name;
 this.productObj.price= this.price;
 this.productObj.offer_price= this.offer_price;
 this.productObj.colours= this.colours;
 this.data.addProduct(this.productObj);
 this.resetForm();

}
//   @ViewChild('id')
//   id!: string;
// @ViewChild('name') name:ElementRef;
editProduct(product:Product){
console.log(this.productList[1])
}
updateProduct(){

}

deleteProduct(product:Product){
  if(window.confirm('Are you sure you want to delete'+product.name+'?')){
    this.data.deleteProduct(product);
  }
 

}




}
