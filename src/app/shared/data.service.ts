import { Injectable } from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs :AngularFirestore) { }


  //add prouct
  addProduct(product:Product){
    product.id= this.afs.createId();
    return this.afs.collection('/Products').add(product);
  }
// get all product
  getAllProduct(){
    return this.afs.collection('/Products').snapshotChanges();
  }

  //delete students
  deleteProduct(product:Product){
    return this.afs.doc('/Products/'+product.id).delete();
  }

  //update product
  updateProduct(product:Product){
    this.deleteProduct(product);
    this.addProduct(product);
  }

}
