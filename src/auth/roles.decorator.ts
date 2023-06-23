import { SetMetadata } from '@nestjs/common';
//import { Role } from './enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
