import http from '@common/utils/http';
import { getValidLan } from '@i18n/index';

export const getBanners = async () => {
  const language = await getValidLan();
  return http.post('/banners', '', {
    headers: {
      'wallet-language': language,
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

export const getNotices = async (params: NoticeProps) => {
  const language = await getValidLan();
  return http.post(
    '/news',
    {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      symbol: params.symbol,
    },
    {
      headers: {
        'wallet-language': language,
      },
    }
  );
};

export const getDAppGroup = async (params: NoticeProps) => {
  const language = await getValidLan();
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
        'wallet-language': language,
      },
    }
  );
};

export const getTags = async () => {
  const language = await getValidLan();
  return http.post('/tags', '', {
    headers: {
      //TODO 服务端没配置英文
      'wallet-language': language,
    },
  });
};

export const getDevInfo = async (params: { device_id: string }) => {
  const language = await getValidLan();
  return http.post(
    '/dev/info',
    {
      ...params,
    },
    {
      headers: {
        'wallet-language': language,
      },
    }
  );
};

export const cancelApplication = async (params: { device_id: string }) => {
  const language = await getValidLan();
  return http.post(
    '/dev/cancel',
    {
      ...params,
    },
    {
      headers: {
        'wallet-language': language,
      },
    }
  );
};

export const report = async (formData: any) => {
  const language = await getValidLan();
  return http.post('/issue', formData, {
    headers: {
      'wallet-language': language,
      'Content-Type': 'multipart/form-data',
    },
  });
};
