import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@linkservice.com';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: 'Administrador',
            password: hashedPassword,
            role: UserRole.ADMIN,
            status: 'active',
        },
    });

    console.log({ admin });

    const userEmail = 'user@linkservice.com';
    const userPassword = 'user123';
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);

    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: 'Usuário Padrão',
            password: hashedUserPassword,
            role: UserRole.USER,
            status: 'active',
        },
    });

    console.log({ user });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
