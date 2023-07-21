const TimeData = [
  '2021-01-02 00:00:00',
  '2021-01-01 00:00:03',
  '2021-01-01 00:00:02',
  '2021-01-01 00:00:05',
]

const str = 'TESTLIHANG202307071530'

console.log(TimeData.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()))

const testEpList = [
  {
    epServiceCode: 1,
    epDate: '2021-01-02 00:00:00',
    key:1,
  },
  {
    epServiceCode: 2,
    key:2,
    epDate: '2021-01-02 00:00:00',
  }
]
const testEpList1 = [
  {
    epServiceCode: 1,
    epDate: '2021-01-02 00:00:00',
    key:1,
  },
  {
    epServiceCode: 1,
    key:2,
    epDate: '2021-01-02 00:00:00',
  }
]

function testEpListArr (list) {
  const arr = [...list]
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    for(let k = 0; k< list.length; k++) {
      if(i.epServiceCode === k.epServiceCode && i.key === k.key) {
        console.log("重复了")
      }
    }
  }

}

testEpListArr(testEpList)
testEpListArr(testEpList1)


console.log("newArr", new Array(1).fill({
  // eslint-disable-next-line no-plusplus
  oddNumber: undefined,
  epServiceCode: undefined,
  epServiceName: undefined,
  routeClassification: undefined,
  routeClassifications: undefined,
  routeClassificationList: []
}))

