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
  public target: string = ''
  constructor(private route: ActivatedRoute, private product: ProductServer, private titleService: Title, private wetoastServer: WetoastServer) { }
  ngOnInit(): void {
    // set title
    this.titleService.setTitle('长按二维码下单')
    // 初始化设置
    this.wetoastServer.showLoadingBalls = true  // show loading balls
    this.wetoastServer.httpFail = false
    this.wetoastServer.httpMes = ""
    this.wetoastServer.curHash = ''


    this.route.params
      .switchMap((params: Params) => this.tmpParam = params['code'])
      .subscribe(() => this.target = this.tmpParam);
    console.log('target')
    console.log(this.target)

    // this.qrCode = `${CONFIG.host}/d/qrcode?target=${localStorage.target}`
    this.qrCode = `${CONFIG.host}/d/qrcode?target=${this.target}`


    // 请求商品信息
    const obj = {
      "url": `${this.target}`
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
      if (Price <= 0) {
        this.wetoastServer.httpFail = true
        this.wetoastServer.httpMes = `抱歉，您输入的网址暂时无法下单，<br/>试试其他商品链接吧！`
        this.wetoastServer.curHash = "product"
        throw Error('输入的网址不支持')
      }
      return res
    }).then((res) => {
      const vm = this
      const product = res.Data
      if (!product.Site) {
        console.log("product")
        console.log(product)
        return product
      } else {
        return this.PriceRmb(product, vm) // 根据网站汇率计算商品人民币价格
      }
    }).then((product: any) => {
      console.log(product)
      product.RmbPrice = (product.Price * product.rate || 1).toFixed(2)
      this.productData = product
      this.showPage = true
    }).catch((err) => {
      console.log(err)
    })

  }

  /**
   * 获取汇率 优先使用网站汇率
   * 
   * @param {*} list 
   * @param {*} product 
   * @param {*} vm 
   * @returns 
   * @memberof ProductComponent
   */
  PriceRmb(product: any, vm: any) {
    console.log(product)
    return new Promise((resolve, reject) => {
      let rate = 1
      const url = product.Site.Url
      const topDomain = Tool.topDomain(url)

      //网站汇率 
      vm.product.websiteRate(topDomain).then((Website: any) => {
        if (Website && Website.List.length > 0) {
          rate = Website.List[0].Rate
          console.log("website rate")
          product.rate = rate
          resolve(product)
        } else {
          // 取不到网站汇率时 使用国家汇率
          vm.product.countryRate(topDomain).then((country: any) => {
            rate = country.Data.Rate
            console.log('国家汇率')
            console.log(rate)
            product.rate = rate
            resolve(product)
          })
        }
      })
    })

  }
}

