
function getBarOption() {
    return {
        xAxis: {
            type: 'category',
            data: ['用户访问', '房源详情', '进线']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [
                    {
                        value: 1111,
                        itemStyle: {
                            color: '#8b5cf6'
                        }
                    },
                    {
                        value: 2222,
                        itemStyle: {
                            color: '#fb7272'
                        }
                    },
                    {
                        value: 3333,
                        itemStyle: {
                            color: '#a0d5ff'
                        }
                    },
                ],
                type: 'bar',
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    color: 'gray',
                    fontSize: 16,
                }
            }
        ],
        toolbox: {
            feature: {
                saveAsImage: {
                    text: '保存为图片'
                }
            }
        },
    };
}

interface axis{
    indexCount: number
    roomDetailCount: number
    tcrCount: number
    time: string
}
function getInsideOption() {
    const List = [
        {indexCount: 1231, roomDetailCount: 233, tcrCount: 231, time: "2022-05-03"},
        {indexCount: 123, roomDetailCount: 233, tcrCount: 431, time: "2022-05-04"},
        {indexCount: 2332, roomDetailCount: 433, tcrCount: 231, time: "2022-05-05"},
        {indexCount: 222, roomDetailCount: 233, tcrCount: 321, time: "2022-05-06"},
        {indexCount: 332, roomDetailCount: 433, tcrCount: 3431, time: "2022-05-07"},
        {indexCount: 2, roomDetailCount: 3233, tcrCount: 431, time: "2022-05-08"},
        {indexCount: 452, roomDetailCount: 533, tcrCount: 1, time: "2022-05-09"},
    ]as axis[]
    const timeList: string[] = List.map((time) => {
        return time.time
    })
    const indexRoomsCount = List.map((count) => {
        return count.indexCount
    })
    const roomDetailCount = List.map((count) => {
        return count.roomDetailCount
    })
    const phoneCallCount = List.map((count) => {
        return count.tcrCount
    })
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['用户访问', '房源详情', '进线']
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    text: '保存为图片'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: timeList
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '用户访问',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                color: '#8b5cf6',
                emphasis: {
                    focus: 'series'
                },
                data: indexRoomsCount
            },
            {
                name: '房源详情',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                color: '#fb7272',
                emphasis: {
                    focus: 'series'
                },
                data: roomDetailCount
            },
            {
                name: '进线',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                color: '#a0d5ff',
                emphasis: {
                    focus: 'series'
                },
                data: phoneCallCount
            }
        ]
    };
}

export {getBarOption, getInsideOption}
