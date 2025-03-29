import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { paymentStatus } from 'src/constants/enum';
import { User } from '../users/user.entity';

@Table
export class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  patientId: number;

  @BelongsTo(() => User, { foreignKey: 'patientId', as: 'patient' })
  patient: User;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  note: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(paymentStatus.AMOUNT_OWED, paymentStatus.AMOUNT_PAID),
  })
  status: paymentStatus;

  // New fee field added
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER, // or use DataType.DECIMAL for more precision
  })
  fee: number;
}
