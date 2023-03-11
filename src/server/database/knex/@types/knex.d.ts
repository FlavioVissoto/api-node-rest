import { Hotsite, Platform } from './../../models';

declare module 'knex/types/tables' {
  interface Tables {
    hotsite: Hotsite;
    platform: Platform;
    // stories: Stories;
    // noticias: Noticias;
  }
}
