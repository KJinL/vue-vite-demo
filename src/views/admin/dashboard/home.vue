<template>
  <div>
    <div class="grid md:grid-cols-3 gap-3 bg-gray-100">
      <el-card
          shadow="hover"
          :body-style="{ padding: '20px' }"
          v-for="(card, index) of cards"
          :key="index"
          class="cursor-pointer"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-bold">{{ card.title }}</h3>
            <el-tag type="danger" size="small" effect="dark">汇总</el-tag>
          </div>
        </template>

        <section class="flex mt-3 justify-between items-center">
          <span class="text-3xl">{{ card.price }}</span>
          <component :is="icons[card.icon]" :class="card.iconColor" class="text-4xl"/>
          <!--          <i :class="[card.icon, card.iconColor]" class="text-5xl"></i>-->
        </section>
        <section class="text-base mt-6 flex justify-between">
          {{ card.totalTitle }}
          <span class>{{ card.total }}</span>
        </section>
      </el-card>
    </div>

    <div class="mt-5 grid md:grid-cols-2 gap-3">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div>用户统计</div>
        </template>
        <div id="echart1" class="h-72 w-full"></div>
      </el-card>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div>销售额</div>
        </template>
        <div id="echart2" class="h-72 w-full"></div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {echart1, echart2} from '../echart'
import * as echarts from 'echarts'
import * as icons from '@icon-park/vue-next'
import {ECharts} from "echarts";
import {getBarOption, getInsideOption} from "@/views/admin/dashboard/charts/dashboard";

interface ICard {
  title: string,
  price: number,
  icon: string,
  iconColor: string,
  totalTitle: string,
  total: number,
}

const cards = ref<ICard[]>([
  {
    title: '用户访问',
    price: 23343,
    iconColor: 'text-violet-500',
    icon: "EveryUser",
    total: 3892982,
    totalTitle: '总访问量'
  },
  {
    title: '房源详情浏览',
    price: 18393,
    iconColor: 'text-green-600',
    icon: "BuildingThree",
    total: 9387382,
    totalTitle: '总浏览量'
  },
  {
    title: '进线电话',
    price: 3803,
    iconColor: 'text-blue-500',
    icon: "PhoneCall",
    total: 83493,
    totalTitle: '总进线量'
  },
])
let chart1: ECharts
let chart2: ECharts
nextTick(() => {
  chart1 = echarts.init(document.getElementById('echart1') as HTMLDivElement)
  chart1.setOption(getBarOption());
  chart2 = echarts.init(document.getElementById('echart2') as HTMLDivElement)
  chart2.setOption(getInsideOption());

})
onMounted(() => {
  window.onresize = () => {
    chart1.resize()
    chart2.resize()
  }
})

</script>

<style lang="scss">

</style>
<script lang="ts">
import meta from './index'

export default {
  meta: {
    pMeta: meta,
    name: 'admin.home',
    menu: {
      title: '状态'
    }
  },

}
</script>


