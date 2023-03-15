import { Knex } from '../../../database/knex';
import { Platform } from '../../../database/models';
import { TableName } from '../../../database/tablename';
import { PlatformResponse } from './../../../entity/contracts/response/platform/hotsite.respose';

export const getAll = async (): Promise<PlatformResponse[]> => {
  const result: PlatformResponse[] = [];

  result.push({ id: 1, nm_platform: 'android' });
  result.push({ id: 2, nm_platform: 'ios' });
  result.push({ id: 3, nm_platform: 'web' });
  return result;
};

export const create = async (params: Omit<Platform, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableName.plataforma).insert(params).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao salvar registro.');
  } catch (error) {
    return new Error('Erro ao salvar registro.');
  }
};
