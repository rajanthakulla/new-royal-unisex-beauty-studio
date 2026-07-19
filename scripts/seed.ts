import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@newroyal.com' },
    update: {},
    create: {
      email: 'admin@newroyal.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log({ admin })

  // Categories
  const hairCat = await prisma.category.upsert({
    where: { slug: 'hair' },
    update: {},
    create: { name: 'Hair Artistry', slug: 'hair' }
  })
  const skinCat = await prisma.category.upsert({
    where: { slug: 'skin' },
    update: {},
    create: { name: 'Dermal Radiance', slug: 'skin' }
  })

  // Services
  await prisma.service.upsert({
    where: { slug: 'signature-royal-haircut' },
    update: {},
    create: {
      title: 'Signature Royal Haircut',
      slug: 'signature-royal-haircut',
      description: 'Includes consultation, head massage, and bespoke styling.',
      price: 85,
      categoryId: hairCat.id
    }
  })
  
  await prisma.service.upsert({
    where: { slug: 'hydra-radiance-facial' },
    update: {},
    create: {
      title: 'Hydra-Radiance Facial',
      slug: 'hydra-radiance-facial',
      description: 'Deep infusion treatment for instant clinical glow.',
      price: 140,
      categoryId: skinCat.id
    }
  })

  // Offers
  await prisma.offer.create({
    data: {
      title: 'Bridal Trial Special',
      description: 'Get 50% off your bridal trial session when you book your wedding date with us.',
      discount: '50% OFF',
      validUntil: new Date('2026-12-31T00:00:00.000Z'),
    }
  })

  console.log("Database seeded!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
