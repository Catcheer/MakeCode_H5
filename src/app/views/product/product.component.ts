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
  public siteName: string = ""
  public showPage: boolean = false
  constructor(private route: ActivatedRoute, private product: ProductServer, private titleService: Title, private wetoastServer: WetoastServer) { }
  ngOnInit(): void {
    // set title
    this.titleService.setTitle('长按二维码下单')
    // 初始化设置
    this.wetoastServer.showLoadingBalls = true  // show loading balls
    this.wetoastServer.httpFail = false
    this.wetoastServer.httpMes = ""
    this.wetoastServer.curHash = ''


    this.qrCode = `${CONFIG.host}/d/qrcode?target=${localStorage.target}`

    // 请求商品信息
    const obj = {
      "url": `${localStorage.target}`
    }
    this.product.getProduct(obj).then((res) => {
      this.wetoastServer.showLoadingBalls = false // hide loading balls
      if (res.httpFalse) {
        this.wetoastServer.httpFail = true
        this.wetoastServer.httpMes = `抱歉，您输入的网址暂时无法下单，<br/>试试其他商品链接吧！`
        this.wetoastServer.curHash = "product"
        throw Error('服务器返回数据错误')
      }
      const Price = res.Data.Price
      if (Price < 0) {
        this.wetoastServer.httpFail = true
        this.wetoastServer.httpMes = `抱歉，您输入的网址暂时无法下单，<br/>试试其他商品链接吧！`
        this.wetoastServer.curHash = "product"
        throw Error('输入的网址不支持')
      }
      return res
    }).then((res) => {
      this.product.websRate().then(webSiteList => {
        const vm = this
        const product = res.Data
        const list = webSiteList.List
        const productPriceRmb = this.PriceRmb(list, product, vm)
        console.log(productPriceRmb)
        this.productData = productPriceRmb
        this.showPage = true
      })
    }).catch((err) => {
      console.log(err)
    })

  }

  PriceRmb(list: any, product: any, vm: any) {
    let obj = {}
    if (product.Site) {
      const siteName = product.Site.Name
      const webSite = list.find((val: any) => val.WebSiteName == siteName)
      const rate = webSite.Rate
      product.RmbPrice = (product.Price * rate).toFixed(2)
    }
    return product
  }




}