/* eslint-disable no-bitwise */
export const ALERTCONFIGMAP = new Map([
  [14, '如何提高个人效率'],
  [15, '健康饮食的重要性及建议'],
  [16, '如何管理时间和任务'],
  [17, '学习新技能的最佳方法是什么'],
]);

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + S4() + S4();
}

export function getDifferentElements(arr1: any[], arr2: any[]) {
  const diff = arr1
    .filter(element => !arr2.includes(element))
    .concat(arr2.filter(element => !arr1.includes(element)));
  return diff;
}
export function flattenArray(arr: any[], key = 'children') {
  let result: any[] = [];
  arr.forEach(item => {
    result.push(item);
    if (item.children) {
      result = result.concat(flattenArray(item[key]));
    }
  });
  return result;
}
export function mergeArraysById(arr1: any[], arr2: any[]) {
  const mergedArray = [...arr1];
  const idMap = new Map(arr1.map(item => [item.id, item]));
  for (const item of arr2) {
    if (idMap.has(item.id)) {
      const existingItem = idMap.get(item.id);
      Object.assign(existingItem, item);
    } else {
      mergedArray.push(item);
      idMap.set(item.id, item);
    }
  }
  return mergedArray;
}
export function findIntersection(arr1: any[], arr2: any[]) {
  // 创建一个空数组来存储交集元素
  const intersection = [];
  // 遍历第一个数组的所有元素

  for (let i = 0; i < arr1.length; i++) {
    // 检查当前元素是否同时存在于第二个数组中
    if (arr2.includes(arr1[i])) {
      // 如果是，则将其添加到交集数组中
      intersection.push(arr1[i]);
    }
  }
  // 返回交集数组
  return intersection;
}
