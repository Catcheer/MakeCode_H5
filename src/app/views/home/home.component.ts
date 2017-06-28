import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { WetoastServer } from '../../servers/wetoast.server'


@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  private webUrl: string = ''
  public tipsObj: any
  constructor(private router: Router, private wetoastServer: WetoastServer) { }

  goProduct() {
    if (this.webUrl.length == 0) {
      this.wetoastServer.tipsFlag = true
      this.wetoastServer.tipsMes = '请输入商品url'
      setTimeout(() => {
        this.wetoastServer.tipsFlag = false
        this.wetoastServer.tipsMes = ""
      }, 2000)
      return false
    }
    this.router.navigate(['/product']);
    console.log(this.webUrl)
    localStorage.target = this.webUrl
    console.log(localStorage.target)
  }

}