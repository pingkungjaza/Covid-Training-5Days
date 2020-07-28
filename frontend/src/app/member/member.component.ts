import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { NetworkService } from '../services/network.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  isShowLogin = true;

  positions = ['Admin', 'Cashier']

  member: Member = new Member();

  constructor(
    private networkService: NetworkService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(["/stock"]);
    }
  }

  onClickLogin() {
    this.networkService.login(this.member).subscribe(
      res => {
        const token = res.token;
        if (token) {
          this.authService.setToken(token);
          this.router.navigate(["/stock"]);
        }
      },
      error => {
        alert(error);
      }
    );
  }

  onClickShowLogin() {
    this.isShowLogin = !this.isShowLogin;
  }

  onClickRegister() {
    this.networkService.register(this.member).subscribe(
      res => {
        alert(res.message);
      },
      error => {
        alert(error);
      }
    );
  }
}
