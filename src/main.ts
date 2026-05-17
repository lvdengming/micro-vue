/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-16 18:18:25
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-17 11:14:29
 */
import type { QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import {
  qiankunWindow,
  renderWithQiankun,
} from 'vite-plugin-qiankun/dist/helper';
import { createApp, type App } from 'vue';
import _App from './App.vue';
import router from './router';
import {
  globalState$,
  initGlobalStateSetter,
  type GlobalState,
} from './services/qiankun';

let app: App<Element> | null = null;

/** 自定义渲染函数 */
function render(props: QiankunProps): void {
  const { container } = props;
  // 子应用挂载的 DOM 节点，优先使用 qiankun 传入的 container，否则使用默认的 #app
  const mountNode = container ? container : '#app';

  app = createApp(_App);
  app.use(router);
  app.mount(mountNode);
}

// 使用 renderWithQiankun 注册生命周期
renderWithQiankun({
  // 应用初始化
  async bootstrap() {},

  // 应用挂载
  async mount(props: QiankunProps) {
    console.log('[MicroVue] app init.');

    render(props);
    initGlobalStateSetter(props.setGlobalState);
    props.onGlobalStateChange((state: GlobalState) => {
      globalState$.next(state);
    }, true);
  },

  // 应用卸载
  async unmount(props: QiankunProps) {
    if (app) {
      // 卸载 Vue 应用
      app.unmount();
      app = null;
    }

    const { container } = props;
    const mountNode = container ? container : document.getElementById('app');
    if (mountNode) {
      // 清空挂载节点的内容
      mountNode.innerHTML = '';
    }
  },

  async update(props: QiankunProps) {},
});

// 如果不是在 qiankun 环境下，则独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
