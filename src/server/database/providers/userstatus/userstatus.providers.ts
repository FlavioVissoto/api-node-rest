import { Knex } from '../../knex';
import { UserStatus } from '../../models';
import { TableName } from '../../tablename';

export const getAll = async (): Promise<UserStatus[] | Error> => {
  try {
    return await Knex(TableName.userstatus).select('*');
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const get = async (id: number): Promise<UserStatus | Error> => {
  try {
    const result = await Knex(TableName.userstatus).select('*').where('id', '=', id).first();
    if (result) {
      result;
    }
    return new Error(`Registro não encontrado para o código: ${id}`);
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const create = async (params: Omit<UserStatus, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableName.userstatus).insert(params).returning('id');
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

export const remove = async (id: number): Promise<void | Error> => {
  try {
    const status = await get(id);
    if (status instanceof Error) {
      return new Error('Erro ao excluir registro.');
    } else {
      status.fl_enable = false;
      return await update(status);
    }
  } catch (error) {
    return new Error('Erro ao excluir registro.');
  }
};

export const update = async (params: UserStatus): Promise<void | Error> => {
  try {
    const result = await Knex(TableName.userstatus).update(params).where('id', '=', params.id);
    if (result > 0) {
      return;
    }
    return new Error('Erro ao atualizar registro.');
  } catch (error) {
    return new Error('Erro ao atualizar registro.');
  }
};
