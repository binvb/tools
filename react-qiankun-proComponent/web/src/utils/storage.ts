export class Storage {
  public constructor() {
      // 对localtorage的操作都需要记录有效期，当对storage类实例化的时候，会去检查是否过期，过期的手动删除
      const curTime = new Date().getTime()
      const allStorage: Record<string, any> = localStorage.valueOf()
      
      Object.keys(allStorage).forEach(item => {
          if(allStorage[item].expire < curTime) {
            this.delItem(item)
          }
      })
  }
  
  /**
   * 
   * @param name 
   * query field
   */
   public getItem(name: string) {
      const item = localStorage.getItem(name)
      let data = ''

      if(item) {
          data = JSON.parse(item).data
      }

      return data
  }

  /**
   * 
   * @param name storage item name
   * @param val  storage item value
   */
   public updateItem(name: string, val: string, expire?: number) { // include add/update， default expiry Date 24hour
      const curTime = new Date().getTime()
      const expireDate = curTime + (expire || 3*24*60*60* 1000) // 默认三天

      localStorage.setItem(name, JSON.stringify({
          data: val,
          expireDate
      }))
  }
  
  /**
   * 
   * @param name storage item name
   */
  public delItem(name: string) {
      localStorage.removeItem(name)
  }
}