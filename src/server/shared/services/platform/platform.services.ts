import { PlatformResponse } from './../../../entity/contracts/response/platform/hotsite.respose';

export const getPlatforms = async (): Promise<PlatformResponse[]> => {
  const result: PlatformResponse[] = [];

  result.push({ id: 1, nm_platform: 'android' });
  result.push({ id: 2, nm_platform: 'ios' });
  result.push({ id: 3, nm_platform: 'web' });
  return result;
};
