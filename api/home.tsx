import http from '@common/utils/http';
import { getValidLan } from '@i18n/index';
import { IResponse } from 'typings/global';
//活动
export interface ActivityParams {
  pageNum?: string;
  pageSize?: string;
  /**
   * 活动状态，0=已结束，1=进行中
   */
  status?: number;
  /**
   * 关联币种
   */
  symbol?: string;
}
export interface ActivityData {
  count: number;
  lists: List[];
}

export interface List {
  /**
   * 内容
   */
  content: string;
  /**
   * 封面图地址
   */
  coverPicture: string;
  /**
   * 起始时间，时间戳
   */
  from: string;
  id: string;
  /**
   * 迷你封面图地址
   */
  miniCoverPicture: string;
  /**
   * pv
   */
  pv: string;
  /**
   * 摘要
   */
  summary: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 结束时间，时间戳
   */
  to: string;
  /**
   * 跳转地址
   */
  url: string;
  /**
   * 价值
   */
  value: string;
}
export async function getActivity(data: ActivityParams): Promise<IResponse<ActivityData>> {
  const language = await getValidLan();
  return http.post(`/activity`, data, {
    headers: {
      'wallet-language': language,
    },
  });
}
