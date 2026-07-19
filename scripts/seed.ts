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

  // Create Default Site Settings
  const settingsCount = await prisma.siteSettings.count()
  if (settingsCount === 0) {
    const settings = await prisma.siteSettings.create({
      data: {
        heroTitle: "Best Unisex Salon",
        heroSubtitle: "in New Baneshwor Kathmandu",
        heroDescription: "Professional hair, beauty, and makeup services...",
        contactPhone: "+977 981-3451412",
        whatsappNumber: "9779813451412",
        address: "M8RP+CCR, Kathmandu 44600",
        googleMapsUrl: "https://maps.google.com/?q=M8RP%2BCCR,+Kathmandu+44600",
        businessHours: "Everyday 9:00 AM - 8:00 PM"
      }
    })
    console.log("Default site settings created!", settings)
  }

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
