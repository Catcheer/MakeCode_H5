import { Component } from '@angular/core'
import { Router } from '@angular/router'


@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  private webUrl: string = ''
  constructor(private router: Router, ) { }
  update() {
    if (this.webUrl.length == 0) {
      return
    }
  }
  goProduct() {
    console.log(this.webUrl)
    this.router.navigate(['/product', decodeURIComponent(this.webUrl)]);
  }

}