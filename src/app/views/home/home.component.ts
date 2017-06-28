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
      return false
    }
  }
  goProduct() {
    if (this.webUrl.length == 0) {
      alert('null')
      return false
    }
    this.router.navigate(['/product']);
    console.log(this.webUrl)
    localStorage.target = this.webUrl
    console.log(localStorage.target)
  }

}