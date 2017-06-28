import { Component } from '@angular/core'
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private location: Location) {
  }
  goBack() {
    this.location.back();  // 利用浏览器的历史堆栈 导航到上一步
  }
}