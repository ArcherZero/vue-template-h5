// 去掉对象中的空属性
export function cleanObj (obj) {
  const result = {}
  for (const key in obj) {
    if (obj[key] || obj[key] === 0) {
      if (!(Array.isArray(obj[key]) && obj[key].length === 0)) {
        result[key] = obj[key]
      }
    }
  }
  return result
}
