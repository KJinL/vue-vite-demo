<template>
  <form @submit="onSubmit">
    <div class="w-[360px] bg-white -translate-y-10 rounded-md shadow-md">
      <div class="p-6 flex flex-col justify-between">
        <h2 class="text-center text-gray-700 text-lg">登录</h2>
        <div class="mt-6">
          <JInput v-model="values.userPhone"/>
          <JError :errorMsg="errors.userPhone"/>
          <JInput v-model="values.passWord" class="mt-3" type="password"/>
          <JError :errorMsg="errors.passWord"/>
        </div>
        <button class="j-button">登录</button>
        <div class="flex justify-center mt-5">
          <a href="#" class="text-xs text-gray-500 hover:text-violet-600 duration-200 ">网站首页</a>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import v from '@/plugins/validate'
import {useRouter} from "vue-router";
import utils from "@/utils";
import md5 from "js-md5";

const router = useRouter()
const {useForm, yup, useField, useFields} = v;

//验证规则
const schema = {
  userPhone: yup.string().required().min(2).label("用户名"),
  passWord: yup.string().required().min(3).label("密码")
}

const {handleSubmit, errors, values} = useForm({
  initialValues: {
    userPhone: 'kajin',
    passWord: '111111',
  },
  validationSchema: schema
})
useFields(Object.keys(schema))

//点击事件
const onSubmit = handleSubmit(async (values: any) => {
  values.passWord = md5(values.passWord)
  utils.user.login(values)
})

</script>
<style lang="scss">
form {
  @apply bg-slate-300 h-screen flex justify-center items-center p-10;
}
</style>
