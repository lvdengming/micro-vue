/*
 * @Author: error: git config user.email & please set dead value or install git
 * @Date: 2026-05-16 18:18:25
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-17 11:09:03
 */
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vue-home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/vue-detail',
      name: 'detail',
      component: () => import('../views/Detail.vue'),
    },
  ],
});

export default router;
