import { Injectable } from '@angular/core'

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    // error = response
    // throw error
    const obj = {
      errMes: '服务器开小差了，请稍后再试~',
      httpFalse: true
    }
    throw obj
  }
}

const parseJSON = (response: any) => {
  return response.json()
}



@Injectable()
export class HttpServer {
  get(url: string) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'image/webp,image/*,*/*;q=0.8',
        'Content-Type': 'image/png'
      }
    })
      .then(checkStatus)
      .then(function (data) {
        console.log('request succeeded with JSON response', data)
        return data
      }).catch(function (error) {
        console.log('request failed', error)
        return error
      })
  }
  post(url: string, obj: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(obj)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        console.log('request succeeded with JSON response', data)
        return data
      }).catch(function (error) {
        console.log('request failed', error)
        return error
      })
  }
}