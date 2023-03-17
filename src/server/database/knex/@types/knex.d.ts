import { Hotsite, Platform } from './../../models';

declare module 'knex/types/tables' {
  interface Tables {
    hotsite: Hotsite;
    tb_platforma: Platform;
    // stories: Stories;
    // noticias: Noticias;
  }
}
