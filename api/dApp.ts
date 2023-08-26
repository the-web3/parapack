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
        },
        {
            headers: {
                'wallet-language': getLanguage(),
            },
        }
    );
};

export const getDAppDetail = (params: any) => {
    return http.post(
        '/contentPage',
        {
            id: params.id,
        },
        {
            headers: {
                'wallet-language': getLanguage(),
            },
        }
    );
};
