import http from '@common/utils/http';
import { getValidLan } from '@i18n/index';
import { IResponse } from 'typings/global';
export interface SymbolSupportDatum {
  /**
   * 链名称
   */
  chainName: string;
  /**
   * 币价折合cny
   */
  cnyRate: string;
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
   * 24h涨跌幅
   */
  rose: string;
  /**
   * 主币名称
   */
  symbol: string;
  /**
   * 代币信息
   */
  token: Token[];
  /**
   * 币价（usdt）
   */
  usdtRate: string;
}

export interface Token {
  /**
   * 数量精度
   */
  amountUnit: number;
  /**
   * 币价折合cny
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
   * 币价（usdt）
   */
  usdtRate: string;
  /**
   * chainId https://chainlist.org/
   */
  chainListId: string;
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
export interface SymbolInfoParams {
  chain: 'string';
  symbol: 'string';
  contract_addr: 'string';
}
export async function getSymbolInfo(data: SymbolInfoParams): Promise<IResponse<SymbolInfoData | null>> {
  const language = await getValidLan();
  return http.post(`/symbol/info`, data, {
    headers: {
      'wallet-language': language,
    },
  });
}

export async function getWeb3RpcUrl({ chainId }: { chainId: string; }): Promise<IResponse<string>> {
  return await http.post(`/symbol/nodeUrl`, { chain_id: chainId });
}
