import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NetworkService } from 'src/app/services/network.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {
  textSearch: String = '';

  displayedColumns = ['image', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private networkService: NetworkService, private router: Router) {
  }

  ngOnInit(): void {
    this.feedData()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  feedData() {
    this.networkService.getProducts().subscribe(
      res => {
        this.dataSource.data = res.map(item => {
          item.image = this.networkService.getProductImageURL(item.image);
          return item;
        })
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }
  deleteProduct(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.networkService.deleteProduct(id).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.feedData();
          },
          error => {
            alert("delete fail");
          }
        );

      }
    })
    
  }

  editProduct(id: number) {
    this.router.navigate([`stock/edit/${id}`]);
  }
  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }
  //function_name(event)
  search(event: Event) {
    let filterValue = '';
    if (event) {
      filterValue = (event.target as HTMLInputElement).value;
    }

    // search from data in datatable not connect database
    this.dataSource.filter = filterValue.trim().toLowerCase()

  }

}

