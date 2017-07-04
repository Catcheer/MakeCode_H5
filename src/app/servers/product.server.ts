import { Component, Injectable } from '@angular/core'
import { HttpServer } from '../http.server'
import CONFIG from '../base.config'

@Injectable()

export class ProductServer {
  constructor(private http: HttpServer) { }
  /**
   * 获取生成二维码的商品的信息
   * 
   * @param {*} obj 
   * @returns 
   * @memberof ProductServer
   */
  getProduct(obj: any) {
    const url: string = `${CONFIG.host}/sixcity`
    const result = this.http.post(url, obj)

    result.then(res => {
      console.log(res)
    })
    return result
  }
  /**
   * support all of sea webs
   * 
   * @returns 
   * @memberof ProductServer
   */
  getAllWebs() {
    const url: string = `${CONFIG.Api}/catelog/categories`
    const obj = {
      "AppKey": "78701677fa28465ca5fb624a51a9dca4",
      "ClientInfo": {
        "FromClient": 128,
        "MachineInfo": "手机型号:64-bit Simulator,软件版本:1.2.9",
        "Version": "2.2.9"
      }
    }
    const result = this.http.post(url, obj)

    result.then(res => {
      console.log(res)
    })
    return result
  }

}