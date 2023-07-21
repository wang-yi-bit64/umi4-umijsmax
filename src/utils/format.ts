// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}


const TimeData = [
  '2021-01-02 00:00:00',
  '2021-01-01 00:00:03',
  '2021-01-01 00:00:02',
  '2021-01-01 00:00:05',
]

console.log(TimeData.sort((a, b) => b - a))