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
  Default,
} from 'sequelize-typescript';
import { AppointmentStatus } from 'src/constants/enum';
import { User } from '../users/user.entity';

@Table
export class Appointment extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATE, // Store as DATE type
  })
  date: Date;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  note: string;

  @AllowNull(false)
  @Default(AppointmentStatus.PENDING)
  @Column({
    type: DataType.ENUM(
      AppointmentStatus.CANCELED,
      AppointmentStatus.COMPLETED,
      AppointmentStatus.PENDING,
    ),
  })
  status: AppointmentStatus;

  // Foreign key for the Patient
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  patientId: number;

  @BelongsTo(() => User, { foreignKey: 'patientId', as: 'patient' })
  patient: User;

  // Foreign key for the Doctor
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  doctorId: number;

  @BelongsTo(() => User, { foreignKey: 'doctorId', as: 'doctor' })
  doctor: User;
}
