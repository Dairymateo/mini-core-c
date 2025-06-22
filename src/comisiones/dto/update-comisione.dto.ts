import { PartialType } from '@nestjs/mapped-types';
import { CreateComisioneDto } from './create-comisione.dto';

export class UpdateComisioneDto extends PartialType(CreateComisioneDto) {}
