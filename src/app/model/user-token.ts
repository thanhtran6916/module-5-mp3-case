import {Role} from './role';

export interface UserToken {

  id?: number;

  name?: string;

  token?: string;

  roles?: Role[];
}
