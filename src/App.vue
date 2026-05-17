<!--
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-16 18:18:25
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-17 11:25:41
-->
<script setup lang="ts">
import { Subject, takeUntil } from 'rxjs';
import { onMounted, onUnmounted, ref } from 'vue';
import {
  globalState$,
  setGlobalState,
  type GlobalState,
} from './services/qiankun';

const states = ref<Array<GlobalState>>([]);
const destroy$ = new Subject<void>();

onMounted(() => {
  globalState$.pipe(takeUntil(destroy$)).subscribe((state: GlobalState) => {
    states.value = [state, ...states.value];
  });
});

onUnmounted(() => {
  destroy$.next();
  destroy$.complete();
});

/** 发送数据到微前端 */
function sendData(): void {
  const timeStr = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(new Date())
    .replace(/\//g, '-');

  // setGlobalState 是 Object.assign 方式，订阅者会拿到合并后的全局状态
  const state: GlobalState = {
    from: 'vue',
    timeStr,
    data: 'Hello from vue - ' + Math.random().toString(16).slice(2, 6),
  };

  setGlobalState(state);
}
</script>

<template>
  <router-view></router-view>

  <div class="actions-wrapper">
    <button @click="sendData()">Send Data</button>
  </div>

  <div class="micro-states-wrapper">
    <p v-for="(state, index) in states" :key="index" class="micro-state-item">
      <span>[{{ state.timeStr }}] </span>
      <span>{{ state.from }}: </span>
      <span>{{ state.data }}</span>
    </p>
  </div>
</template>

<style scoped>
.micro-states-wrapper {
  height: 150px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 12px;
  overflow-y: auto;
}
</style>
