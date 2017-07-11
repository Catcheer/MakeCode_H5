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
      const vm = this
      const product = res.Data
      return this.PriceRmb(product, vm) // 根据国家汇率计算商品人民币价格
    }).then((productPriceRmb) => {
      this.productData = productPriceRmb
      this.showPage = true
    }).catch((err) => {
      console.log(err)
    })

  }

  /**
   * 根据国家汇率计算商品人民币价格
   * 
   * @param {*} list 
   * @param {*} product 
   * @param {*} vm 
   * @returns 
   * @memberof ProductComponent
   */
  PriceRmb(product: any, vm: any) {
    return new Promise((resolve, reject) => {
      if (!product.Site) {
        console.log("product")
        console.log(product)
        resolve(product)
      }
      const siteName = product.Site.Name
      const url = product.Site.Url
      const host = Tool.topDomain(url)
      // 国家汇率
      vm.product.countryRate(host).then((country: any) => {
        const rate = country.Data.Rate
        console.log(rate)
        product.RmbPrice = (product.Price * rate).toFixed(2)
        resolve(product)
      })
    })

  }
}