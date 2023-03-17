import { Hotsite, Platform } from './../../models';

declare module 'knex/types/tables' {
  interface Tables {
    hotsite: Hotsite;
    TB_PLATFORMA: Platform;
    // stories: Stories;
    // noticias: Noticias;
  }
}
