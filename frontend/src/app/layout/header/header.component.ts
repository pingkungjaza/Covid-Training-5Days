import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mailNotification = 20;
  feedNotification = 8;
  
  @Output('toggle') navToggle = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClickLogout(){
    this.authService.logout();
  }

  onClickNavToggle() {
    this.navToggle.emit();
  }
}
