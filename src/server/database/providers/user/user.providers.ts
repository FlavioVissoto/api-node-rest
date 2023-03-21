import chalk from 'chalk';
import { Knex } from '../../knex';
import { TableName } from '../../tablename';
import { User } from './../../models/user.model';

export const getAll = async (): Promise<User[] | Error> => {
  try {
    return await Knex(TableName.user).select('*');
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const get = async (id: number): Promise<User | Error> => {
  try {
    const result = await Knex(TableName.user).select('*').where('id', '=', id).first();
    if (result) {
      result;
    }
    return new Error(`Registro não encontrado para o código: ${id}`);
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const getByEmail = async (email: string): Promise<User | Error> => {
  try {
    const result = await Knex(TableName.user).select('*').where('nm_email', '=', email).first();
    if (result) {
      return result;
    }
    return new Error(`Registro não encontrado para o e-mail: ${email}`);
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const getByEmailAndPass = async (email: string, pass: string): Promise<User | Error> => {
  try {
    const result = await Knex(TableName.user).select('*').where('email', '=', email).andWhere('pass', '=', pass).first();
    if (result) {
      return result;
    }
    return new Error(`Registro não encontrado para o e-mail: ${email}`);
  } catch (error) {
    return new Error('Erro ao consultar registro.');
  }
};

export const create = async (params: Omit<User, 'id'>): Promise<number | Error> => {
  try {
    const validateEmail = await getByEmail(params.nm_email);
    if (validateEmail instanceof Error && validateEmail.message != `Registro não encontrado para o e-mail: ${params.nm_email}`) {
      return new Error('E-mail já existente');
    }

    const [result] = await Knex(TableName.user).insert(params).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao salvar registro.');
  } catch (error) {
    console.log(chalk.red(error));
    return new Error('Erro ao salvar registro.');
  }
};

export const remove = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(TableName.user).where('id', '=', id).del();
    if (result > 0) {
      return;
    }
    return new Error('Erro ao excluir registro.');
  } catch (error) {
    return new Error('Erro ao excluir registro.');
  }
};

export const update = async (params: User): Promise<void | Error> => {
  try {
    const result = await Knex(TableName.user).update(params).where('id', '=', params.id);
    if (result > 0) {
      return;
    }
    return new Error('Erro ao atualizar registro.');
  } catch (error) {
    return new Error('Erro ao atualizar registro.');
  }
};
