/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-17 11:13:23
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-17 11:13:28
 */
import { ReplaySubject } from 'rxjs';

/** 全局状态 */
export const globalState$ = new ReplaySubject<GlobalState>(1);

/** 设置全局状态 */
export let setGlobalState: SetGlobalState;

/** 初始化全局状态设置方法 */
export const initGlobalStateSetter = (setter: SetGlobalState) => {
  setGlobalState = setter;
};

/** bootstrap 时传递的 props */
export interface QiankunBootstrapProps {
  name: string;

  [key: string]: any;
}

/** mount 时传递的 props */
export interface QiankunMountProps {
  name: string;
  container: HTMLElement;
  onGlobalStateChange: (
    callback: OnGlobalStateChangeCallback,
    fireImmediately?: boolean,
  ) => void;
  setGlobalState: SetGlobalState;

  [key: string]: any;
}

/** unmount 时传递的 props */
export interface QiankunUnmountProps {
  name: string;

  [key: string]: any;
}

/** 全局状态变更回调 */
export type OnGlobalStateChangeCallback = (
  state: GlobalState,
  prevState: GlobalState,
) => void;

/** 设置全局状态 */
export type SetGlobalState = (state: GlobalState) => void;

/** 全局状态 */
export interface GlobalState {
  /** 状态来源 */
  from: 'main' | 'angular' | 'react' | 'vue';
  /** 状态更新时间 */
  timeStr: string;
  /** 传递的数据 */
  data: any;
}
