import http from '@common/utils/http';
import { getUniqueId } from 'react-native-device-info';
import { IResponse } from 'typings/global';

export const getCommonHealth = async (): Promise<IResponse<null>> => {
  return http.get(`/common/health`);
};

export const getFlush = async (data?: { device_id?: string }): Promise<IResponse<any>> => {
  const device_id = await getUniqueId();
  console.log(1111111, data);
  return http.post(`/flush`, {
    device_id: data?.device_id || device_id,
  });
};
