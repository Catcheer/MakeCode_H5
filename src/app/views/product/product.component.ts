import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { ProductServer } from '../../servers/product.server'
import { WetoastServer } from '../../servers/wetoast.server'
import { Title } from '@angular/platform-browser';
import CONFIG from '../../base.config'
import Tool from '../../util/Tool'

import 'rxjs/add/operator/switchMap';

class UlrCode {
  "target": string
}
@Component({
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  private productData: any = {}
  private tmpParam: any
  public urlcode: UlrCode
  public qrCode: string = ''
  public orignUrl: string = ""
  public showPage: boolean = false
  constructor(private route: ActivatedRoute, private product: ProductServer, private titleService: Title, private wetoastServer: WetoastServer) { }
  ngOnInit(): void {
    this.wetoastServer.showLoadingBalls = true  // show loading balls
    this.wetoastServer.httpFail = false
    this.wetoastServer.httpMes = ""
    this.wetoastServer.curHash = ''


    this.qrCode = `${CONFIG.host}/d/qrcode?target=${localStorage.target}`

    // 请求接口
    const obj = {
      "target": `${localStorage.target}`
    }
    this.product.getProduct(obj).then(res => {
      this.wetoastServer.showLoadingBalls = false // hide loading balls
      if (res.httpFalse) {
        this.wetoastServer.httpFail = true
        this.wetoastServer.httpMes = `抱歉，您输入的网址暂时无法下单，<br/>试试其他商品链接吧！`
        this.wetoastServer.curHash = "product"
        return
      }
      const OriginalPrice = res.Data.OriginalPrice
      let url = res.Data.Url
      if (url) {
        this.orignUrl = Tool.topDomain(url)
      }
      if (OriginalPrice <= 0 && url) {
        this.wetoastServer.httpFail = true
        this.wetoastServer.httpMes = `抱歉，您输入的网址暂时无法下单，<br/>试试其他商品链接吧！`
        this.wetoastServer.curHash = "product"
        return
      }
      this.productData = res.Data
      this.showPage = true
    })
    // set title
    this.titleService.setTitle('长按二维码下单')

  }
}