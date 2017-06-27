import { Component, Injectable } from '@angular/core'
import { HttpServer } from '../http.server'

@Injectable()

export class ProductServer {
  constructor(private http: HttpServer) { }
  getProduct(obj: any) {
    const url: string = "/sixcity"
    const result = this.http.post(url, obj)

    result.then(res => {
      console.log(res)
    })
    return result
  }

  // getCode() {
  //   const url: string = "/d/qrcode?target=https%3A%2F%2Fwww.amazon.com%2Fdp%2FB00X4WHP5E%2Fref%3Dods_gw_ha_dr_unrec%3Fpf_rd_p%3Df19454ee-0d7b-4694-9d23-cc34cb8db4d2%26pf_rd_r%3DJKWXE4G1WEAB3CBB2J6A"
  //   const result = this.http.get(url)

  //   result.then(res => {
  //     console.log(res)
  //   })
  //   return result
  // }
}