import { HotsiteRequest } from '../../../entity/contracts/request/hotsite/hotsite.request';
import { HotsiteResponse } from '../../../entity/contracts/response/hotsite/hotsite.respose';

export const getHotsite = async (req: HotsiteRequest): Promise<HotsiteResponse[]> => {
  const result: HotsiteResponse[] = [];

  if (!req.qtdMonths) {
    req.qtdMonths = 6;
  }

  for (let index = 0; index < req.qtdMonths; index++) {
    result.push({
      id: index + 1,
      dt_info: getCurrentDate(setMonths(index * -1)),
      nr_bounce_rate: random(),
      nr_download: random(),
      nr_instalacao: random(),
      nr_lista_espera: random(),
      nr_usuario: random(),
    });
  }
  return result;
};

const random = () => {
  return Math.floor(Math.random() * 9999);
};

const setMonths = (months: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
};

const getCurrentDate = (t: Date): string => {
  //const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}`;
};
