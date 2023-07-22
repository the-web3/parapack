import http from '@common/utils/http';
import { IResponse } from 'typings/global';

export function getCommonHealth(): Promise<IResponse<null>> {
  return http.get(`/common/health`);
}
