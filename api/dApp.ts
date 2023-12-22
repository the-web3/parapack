import http from '@common/utils/http';
import { getLanguage } from '@common/utils/platform';

export const getBanners = () => {
  return http.post('/banners', '', {
    headers: {
      'wallet-language': getLanguage(),
    },
  });
};

interface NoticeProps {
  pageNum?: number;
  pageSize?: number;
  symbol?: string;
  tag?: string; //hot||new
  timeType?: string; //6h||24h
  id?: number;
  search?: string;
  // walletLanguage: string;
}

export const getNotices = (params: NoticeProps) => {
  return http.post(
    '/news',
    {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      symbol: params.symbol,
    },
    {
      headers: {
        'wallet-language': getLanguage(),
      },
    }
  );
};

export const getDAppGroup = (params: NoticeProps) => {
  return http.post(
    '/group',
    {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      symbol: params.symbol,
      tag: params.tag,
      timeType: params.timeType,
      id: params.id,
      search: params.search,
    },
    {
      headers: {
        'wallet-language': getLanguage(),
      },
    }
  );
};

export const getTags = () => {
  return http.post('/tags', '', {
    headers: {
      //TODO 服务端没配置英文
      'wallet-language': getLanguage(),
    },
  });
};

export const getDevInfo = (params: { device_id: string }) => {
  return http.post(
    '/dev/info',
    {
      ...params,
    },
    {
      headers: {
        'wallet-language': getLanguage(),
      },
    }
  );
};

export const cancelApplication = (params: { device_id: string }) => {
  return http.post(
    '/dev/cancel',
    {
      ...params,
    },
    {
      headers: {
        'wallet-language': getLanguage(),
      },
    }
  );
};

export const report = (formData: any) => {
  return http.post('/issue', formData, {
    headers: {
      'wallet-language': getLanguage(),
      'Content-Type': 'multipart/form-data',
    },
  });
};
