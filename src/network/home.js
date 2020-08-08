import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}


export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()


// let totalNums = []

// const num1 = [22,20,10]
// const num2 = [202, 200, 100]

// // 第一种语法
// // for (let n of num1) {
// //   totalNums.push(n)
// // }

// // 第二种语法
// totalNums.push(...num1)