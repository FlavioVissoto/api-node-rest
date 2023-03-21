import { LogService } from '../../../shared/services';
import { Knex } from '../../knex';
import { Platform } from '../../models';
import { TableName } from '../../tablename';

export const getAllWithPagination = async (page: number, limit: number, filter: string): Promise<Platform[] | Error> => {
  try {
    const result = await Knex(TableName.platforma)
      .select('*')
      //.where('id', '=', '')
      .orWhere('nm_platform', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .orderBy('nm_platform', 'asc')
      .limit(limit);

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: getAllWithPagination.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao consultar registro.');
  }
};

export const getAll = async (): Promise<Platform[] | Error> => {
  try {
    return await Knex(TableName.platforma).select('*');
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: getAll.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao consultar registro.');
  }
};

export const get = async (id: number): Promise<Platform | Error> => {
  try {
    const result = await Knex(TableName.platforma).select('*').where('id', '=', id).first();
    if (result) {
      return result;
    }
    return new Error(`Registro não encontrado para o código: ${id}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: get.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao consultar registro.');
  }
};

export const create = async (params: Omit<Platform, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableName.platforma).insert(params).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao salvar registro.');
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: create.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao salvar registro.');
  }
};

export const remove = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(TableName.platforma).where('id', '=', id).del();
    if (result > 0) {
      return;
    }
    return new Error('Erro ao excluir registro.');
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: remove.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao excluir registro.');
  }
};

export const update = async (params: Platform): Promise<void | Error> => {
  try {
    const result = await Knex(TableName.platforma).update(params).where('id', '=', params.id);
    if (result > 0) {
      return;
    }
    return new Error('Erro ao atualizar registro.');
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: update.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao atualizar registro.');
  }
};

export const count = async (filter: string): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(TableName.platforma)
      .where('nm_platform', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(count)) {
      return count;
    }
    return new Error('Erro ao consultar a quantidade de registros.');
  } catch (err: unknown) {
    if (err instanceof Error) {
      LogService.writeError({
        method: count.name,
        file: __dirname,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    }
    return new Error('Erro ao consultar a quantidade de registros.');
  }
};
