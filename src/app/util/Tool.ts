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
  }
}