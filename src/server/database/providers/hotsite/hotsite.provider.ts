// export const getAllWithPagination = async (page: number, limit: number, filter: string): Promise<Platform[] | Error> => {
//   try {
//     const result = await Knex(TableName.platforma)
//       .select('*')
//       //.where('id', '=', '')
//       .orWhere('nm_platform', 'like', `%${filter}%`)
//       .offset((page - 1) * limit)
//       .orderBy('nm_platform', 'asc')
//       .limit(limit);

//     return result;
//   } catch (error) {
//     return new Error('Erro ao consultar registro.');
//   }
// };

// export const getAll = async (): Promise<Platform[]> => {
//   const result: Platform[] = [];

//   result.push({ id: 1, nm_platform: 'android' });
//   result.push({ id: 2, nm_platform: 'ios' });
//   result.push({ id: 3, nm_platform: 'web' });
//   return result;
// };

// export const get = async (id: number): Promise<Platform | Error> => {
//   try {
//     const result = await Knex(TableName.platforma).select('*').where('id', '=', id).first();
//     if (result) {
//       result;
//     }
//     return new Error(`Registro não encontrado para o código: ${id}`);
//   } catch (error) {
//     return new Error('Erro ao consultar registro.');
//   }
// };

// export const create = async (params: Omit<Platform, 'id'>): Promise<number | Error> => {
//   try {
//     const [result] = await Knex(TableName.platforma).insert(params).returning('id');
//     if (typeof result === 'object') {
//       return result.id;
//     } else if (typeof result === 'number') {
//       return result;
//     }
//     return new Error('Erro ao salvar registro.');
//   } catch (error) {
//     return new Error('Erro ao salvar registro.');
//   }
// };

// export const remove = async (id: number): Promise<void | Error> => {
//   try {
//     const result = await Knex(TableName.platforma).where('id', '=', id).del();
//     if (result > 0) {
//       return;
//     }
//     return new Error('Erro ao excluir registro.');
//   } catch (error) {
//     return new Error('Erro ao excluir registro.');
//   }
// };

// export const update = async (params: Platform): Promise<void | Error> => {
//   try {
//     const result = await Knex(TableName.platforma).update(params).where('id', '=', params.id);
//     if (result > 0) {
//       return;
//     }
//     return new Error('Erro ao atualizar registro.');
//   } catch (error) {
//     return new Error('Erro ao atualizar registro.');
//   }
// };

// export const count = async (filter: string): Promise<number | Error> => {
//   try {
//     const [{ count }] = await Knex(TableName.platforma)
//       .where('nm_platform', 'like', `%${filter}%`)
//       .count<[{ count: number }]>('* as count');

//     if (Number.isInteger(count)) {
//       return count;
//     }
//     return new Error('Erro ao consultar a quantidade de registros.');
//   } catch (error) {
//     return new Error('Erro ao consultar a quantidade de registros.');
//   }
// };
