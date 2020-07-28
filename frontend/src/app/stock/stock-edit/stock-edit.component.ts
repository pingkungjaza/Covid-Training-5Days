import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {
  imageSrc: string | ArrayBuffer;

  @ViewChild('productForm', { static: true }) productForm: NgForm //call 'productForm' from #productForm in html
  file: File;
  //DI in angular created and call in constructor
  constructor(
    private activateRoute: ActivatedRoute,
    private networkService: NetworkService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.feedData(params.id)
    });
  }

  feedData(id: number) {
    this.networkService.getProduct(id).subscribe(
      res => {
        setTimeout(() => {
          var { productId, name, stock, price, image } = { ...res }
          this.imageSrc = this.networkService.getProductImageURL(image);
          this.productForm.setValue({ productId, name, stock, price });
        });
      },
      error => {
        this.router.navigate(["/stock"]);
      }
    );
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    const value = form.value;

    let product = new Product();
    product.name = value.name;
    product.image = this.file;
    product.price = value.price;
    product.stock = value.stock

    this.networkService.editProduct(product, value.productId).subscribe(
      res => {
        this.router.navigate(["/stock"]);
      },
      error => {
        alert(error);
      }
    );
  }
  onPreviewImage(event) {
    const metaImage = event.target.files[0]
    if (metaImage) {
      this.file = metaImage

      const reader = new FileReader()
      reader.readAsDataURL(metaImage)
      reader.onload = () => {
        this.imageSrc = reader.result
      }
    }
  }
}
