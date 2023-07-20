import http from '@common/utils/http';
import { IResponse } from 'typings/global';
export interface SymbolSupportDatum {
  map(arg0: (item: any) => Promise<any>): any;
  /**
   * 链名称
   */
  chainName: string;
  /**
   * 默认初始化状态
   */
  default: boolean;
  /**
   * 热门币种
   */
  hot: boolean;
  /**
   * logo地址
   */
  logo: string;
  /**
   * 主币名称
   */
  symbol: string;
  /**
   * 代币信息
   */
  token: Token[];
}

export interface Token {
  /**
   * 数量精度
   */
  amountUnit: number;
  /**
   * 折合cny
   */
  cnyRate: string;
  /**
   * 合约地址
   */
  contractAddr?: string;
  /**
   * 合约精度
   */
  contractUnit?: number;
  /**
   * 24h涨跌幅
   */
  rose: string;
  /**
   * 默认初始化状态
   */
  tokenDefault: boolean;
  /**
   * 热门代币
   */
  tokenHot: boolean;
  /**
   * 代币logo地址
   */
  tokenLogo: string;
  /**
   * 代币名称
   */
  tokenName: string;
  /**
   * 类型，1=主币，0=代币
   */
  type: number;
  /**
   * 折合usdt
   */
  usdtRate: string;
}
export interface SymbolSupportParams {
  chain?: string;
  contract_addr?: string;
  symbol?: string;
  tokenName?: string;
}

//开放的链及币种
export function getSymbolSupport(data: SymbolSupportParams): Promise<IResponse<SymbolSupportDatum[] | null>> {
  return http.post(`/symbol/support`, data);
}
export interface SymbolRateDatum {
  /**
   * 基础货币，例如：BTC
   */
  base?: string;
  /**
   * 计价货币，例如：USDT
   */
  quote?: string;
  /**
   * 汇率，例如：30000
   */
  rate?: string;
  /**
   * 币对，例如：BTCUSDT
   */
  symbol?: string;
}
export interface SymbolParams {
  symbol?: string;
}
export function getSymbolRate(data: SymbolParams): Promise<IResponse<SymbolRateDatum[] | null>> {
  return http.post(`/symbol/rate`, data);
}
export interface SymbolKlineData {
  /**
   * k线
   */
  kline: Kline[];
  /**
   * 涨跌幅，24h涨跌幅
   */
  rose: string;
  /**
   * 币种，例如BTC
   */
  symbol: string;
}

export interface Kline {
  /**
   * 价格
   */
  price?: string;
  /**
   * 时间，时间戳
   */
  time?: string;
}

export function getSymbolKline(data: SymbolParams): Promise<IResponse<SymbolKlineData | null>> {
  return http.post(`/symbol/kline`, data);
}
export interface SymbolInfoData {
  /**
   * 链名称
   */
  chainName: string;
  /**
   * 发行量
   */
  circulation: string;
  /**
   * 合约地址
   */
  contractAddr: string;
  /**
   * 简介
   */
  introduction: string;
  /**
   * 媒介
   */
  medium: Medium[];
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 代币名称
   */
  tokenName: string;
}

export interface Medium {
  /**
   * logo
   */
  logo?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 跳转地址
   */
  url?: string;
}
export function getSymbolInfo(data: { 'wallet-language': string }): Promise<IResponse<SymbolInfoData | null>> {
  return http.post(`/symbol/info`, data);
}
