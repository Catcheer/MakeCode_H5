import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { WetoastServer } from '../../servers/wetoast.server'
import Tool from '../../util/Tool'


@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  private webUrl: string = ''
  public tipsObj: any
  constructor(private router: Router, private wetoastServer: WetoastServer) { }

  /**
   * 点击一键海淘按钮
   * 
   * @returns 
   * @memberof HomeComponent
   */
  goProduct() {
    if (this.webUrl.length == 0) {
      let mes: string = "请输入商品url~"
      this.changeWetoastState(mes)
      return false
    }
    let checkUrl = Tool.CheckUrl(this.webUrl)
    if (!checkUrl) {
      let mes: string = "请输入正确的商品url~"
      this.changeWetoastState(mes)
      return false
    }
    this.router.navigate(['/product']);
    console.log(this.webUrl)
    localStorage.target = this.webUrl
    console.log(localStorage.target)
  }
  /**
   * 根据验证状态change wetoast
   * 
   * @param {string} mes 
   * @memberof HomeComponent
   */
  changeWetoastState(mes: string = "") {
    this.wetoastServer.tipsFlag = true
    this.wetoastServer.tipsMes = mes
    setTimeout(() => {
      this.wetoastServer.tipsFlag = false
      this.wetoastServer.tipsMes = ""
    }, 2000)
  }



}