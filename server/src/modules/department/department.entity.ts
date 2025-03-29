import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Department extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}
