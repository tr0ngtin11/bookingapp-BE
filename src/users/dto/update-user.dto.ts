import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// các field sẽ thành optinal
export class UpdateUserDto extends PartialType(CreateUserDto) {}
