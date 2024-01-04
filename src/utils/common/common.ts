import moment from 'moment'
import { type MomentInput } from 'moment'

/**
 * @description 格式化日期时间
 * @param time 时间
 * @param format 格式
 * @returns
 */
export function formatDatetime(
  time: MomentInput = undefined,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(time).format(format)
}

/**
 * @description 格式化日期
 * @param date 时间
 * @param format 格式
 * @returns
 */
export function formatDate(date: MomentInput = undefined, format: string = 'YYYY-MM-DD') {
  return formatDatetime(date, format)
}

/**
 * @description 函数节流
 * @param callBack 回调函数
 * @param delay 时延
 * @returns
 */
export function throttle(callBack: Function, delay: number) {
  let context: Function
  let previous: number = 0
  return function (this: any, ...theArgs: any) {
    const now = new Date().getTime()
    context = this
    if (now - previous > delay) {
      callBack.apply(context, theArgs)
      previous = now
    }
  }
}

/**
 * @description 函数防抖
 * @param callBack 回调函数
 * @param delay 时延
 * @param immediate
 * @returns
 */
export function debounce(callBack: Function, delay: number, immediate: boolean) {
  let timeout: number | null = null
  return function (this: any, ...args: any) {
    const context: Function = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未赋值或为null
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (callNow) {
        callBack.apply(context, args)
      }
    } else {
      //如果immediate为false，则函数等待delay毫秒后执行
      timeout = setTimeout(() => {
        callBack.apply(context, args)
      }, delay)
    }
  }
}
