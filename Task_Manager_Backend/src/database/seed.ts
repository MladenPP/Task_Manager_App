import { AppDataSource } from './data-source';
import { User } from '../user/entities/user.entity';
import bcrypt from 'bcrypt';
import { UserRole } from '../user/entities/user.role';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const exists = await userRepo.findOne({
    where: { email: 'admin@admin.com' },
  });

  if (!exists) {
    const hashedPassword = await bcrypt.hash('adminadmin', 10);

    await userRepo.save({
      firstname: 'Admin',
      lastname: 'Admin',
      phone: '+381600000000',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
  }

  await AppDataSource.destroy();
}

seed();
