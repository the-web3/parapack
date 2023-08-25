import http from '@common/utils/http';

export const getBanners = (walletLanguage: string) => {

    return http.post('/banners', '', {
        headers: {
            "wallet-language": walletLanguage
        }
    });
}

interface NoticeProps {
    pageNum?: number
    pageSize?: number
    symbol?: string
    walletLanguage: string
}

export const getNotices = (params: NoticeProps) => {
    return http.post('/news', {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        symbol: params.symbol
    }, {
        headers: {
            "wallet-language": params.walletLanguage
        }
    })
}

export const getDAppGroup = (params: NoticeProps) => {
    return http.post('/group', {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        symbol: params.symbol
    }, {
        headers: {
            "wallet-language": params.walletLanguage
        }
    })
}

export const getDAppDetail = (params: any) => {
    return http.post('/contentPage', {
        id: params.id 
    }, {
        headers: {
            "wallet-language": params.walletLanguage
        }
    });
}
