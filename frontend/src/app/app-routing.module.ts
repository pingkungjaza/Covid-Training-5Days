import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { MemberComponent } from './member/member.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from 'src/app/services/auth.guard'

const routes: Routes = [
  {
    path: 'stock', children: [
      { path: '', component: StockHomeComponent },
      { path: 'create', component: StockCreateComponent },
      { path: 'edit/:id', component: StockEditComponent },
    ], canActivate: [AuthGuard]
  },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: '**', component: MemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }