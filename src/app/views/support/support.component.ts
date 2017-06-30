import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';
import { ProductServer } from '../../servers/product.server'
import { WetoastServer } from '../../servers/wetoast.server'
import Support from '../../dao/Support'

import Tool from '../../util/Tool'

const allOfCountry: string = "全部国家"

@Component({
  templateUrl: './support.component.html'
})

export class SupportComponent implements OnInit {
  public webListAll: any = []
  public webList: any = []
  public allCountryList: string[] = []
  public seledCountry: string = allOfCountry
  private errObj: any = {
    err: false,
    errMes: "",
  }
  private showLoadingBalls: boolean = false
  constructor(private product: ProductServer, private titleService: Title, private wetoastServer: WetoastServer) { }
  ngOnInit() {
    // 初始化
    this.init()

  }
  /**
   * init
   * 
   * @private
   * @memberof SupportComponent
   */
  private init() {
    // set html title
    this.titleService.setTitle('支持的海外网站')
    this.wetoastServer.showLoadingBalls = true
    this.product.getAllWebs()
      .then((res: any) => {
        console.log(res)
        this.wetoastServer.showLoadingBalls = false
        if (res.httpFalse) {
          this.errObj.err = true
          this.errObj.errMes = res.errMes
          return
        } else {
          const list = res.List
          this.webListAll = list
          this.allCountryList = this.FilterCountriesList(list)
          this.webList = this.seledCountryWebList(this.seledCountry, this.webListAll)
        }

      })
  }
  /**
   * 提取出国家list
   * 
   * @private
   * @param {*} list 
   * @returns {*} 
   * @memberof SupportComponent
   */
  private FilterCountriesList(list: any): any {
    let newArr: any = []
    const len = list.length
    for (let i = 0; i < len; i += 1) {
      const WebSites = list[i].WebSites
      WebSites.forEach((item: any) => {
        let countryName = item.CountryName
        if (!newArr.includes(countryName)) {
          newArr.push(countryName)
        }

      })
    }
    // 
    newArr.unshift(allOfCountry)
    return newArr
  }
  /**
   * 切换选中国家
   * 
   * @private
   * @param {string} country 
   * @memberof SupportComponent
   */
  private toggleCountey(country: string): void {
    this.seledCountry = country
    this.webList = this.seledCountryWebList(this.seledCountry, this.webListAll)
  }

  /**
   * 筛选选中的国家的web
   * 
   * @private
   * @param {string} seledCountry 
   * @param {*} list 
   * @returns 
   * @memberof SupportComponent
   */
  private seledCountryWebList(seledCountry: string, listDate: any) {
    const list: any = Tool.deepCopy(listDate)
    let newArr: any = []
    if (seledCountry == allOfCountry) {
      newArr = list
    } else {
      const len = list.length
      for (let i = 0; i < len; i += 1) {
        const WebSites = list[i].WebSites
        let tmpArr = WebSites.filter((val: any) => val.CountryName == seledCountry)
        list[i].WebSites = tmpArr
        if (tmpArr.length > 0) {
          newArr.push(list[i])
        }
      }
    }
    return newArr
  }

}