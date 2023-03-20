import { Hotsite, Platform, User, UserStatus } from './../../models';

declare module 'knex/types/tables' {
  interface Tables {
    hotsite: Hotsite;
    TB_PLATFORMA: Platform;
    TB_USER: User;
    TB_USER_STATUS: UserStatus;
  }
}
