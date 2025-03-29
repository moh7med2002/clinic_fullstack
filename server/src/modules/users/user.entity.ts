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
  HasMany,
} from 'sequelize-typescript';
import { Gender, UserRoleStatus } from 'src/constants/enum';
import { Department } from '../department/department.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Payment } from '../payment/payment.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column({
    defaultValue:
      'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
  })
  image: string;

  @AllowNull(false)
  @Column
  phone: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(Gender.FEMALE, Gender.MALE),
  })
  gender: Gender;

  @AllowNull(false)
  @Column({
    type: DataType.DATE, // Store as DATE type
  })
  birthdate: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(UserRoleStatus.DOCTOR, UserRoleStatus.PATIENT),
  })
  role: UserRoleStatus;

  // Foreign key for department
  @ForeignKey(() => Department)
  @AllowNull(true) // Allow departmentId to be nullable
  @Column({
    type: DataType.INTEGER, // Ensure the column type is an integer
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  // One patient can have many appointments
  @HasMany(() => Appointment, {
    foreignKey: 'patientId',
    as: 'patientAppointments',
  })
  patientAppointments: Appointment[];

  // One doctor can have many appointments
  @HasMany(() => Appointment, {
    foreignKey: 'doctorId',
    as: 'doctorAppointments',
  })
  doctorAppointments: Appointment[];

  @HasMany(() => Payment, { foreignKey: 'patientId', as: 'payments' })
  payments: Payment[];
}
