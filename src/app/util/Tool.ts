export default {
  /**
   * 对象数组深拷贝
   * 
   * @param {*} obj 
   * @returns 
   */
  deepCopy(obj: any) {
    var b, k, temp;
    if ((b = (obj instanceof Array)) || obj instanceof Object) {
      temp = b ? [] : {}
      for (k in obj) {
        if (obj[k] instanceof Array || obj[k] instanceof Object) {
          temp[k] = this.deepCopy(obj[k])
        } else {
          temp[k] = obj[k]
        }
      }
      return temp;
    }
  },

  /**
   * 验证网址
   * 
   * @param {string} url 
   * @returns 
   */
  CheckUrl(url: string) {
    var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (!reg.test(url)) {
      return false
    }
    return true
  },
  /**
   * 获取顶级域名
   * @param {any} url
   * @returns
   */
  topDomain(url: string) {

    const re = /([^.]+\.)?([^\.]+\..+)/
    const str = url
    const m = str.match(re)
    if (m.length > 2) {
      console.log('m[2]')
      console.log(m[2].split("/")[0])
      return m[2].split("/")[0]
    } else {
      console.log(m[1])
    }
  },
}