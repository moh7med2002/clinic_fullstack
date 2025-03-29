import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Appointment } from 'src/modules/appointment/appointment.entity';
import { Department } from 'src/modules/department/department.entity';
import { Payment } from 'src/modules/payment/payment.entity';
import { User } from 'src/modules/users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'clinic',
      });
      sequelize.addModels([User, Department, Admin, Appointment, Payment]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];
