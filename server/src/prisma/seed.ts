import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  
  const filePath = path.join(__dirname, 'orders.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const orders = JSON.parse(fileData);


  try {
    await prisma.orders.deleteMany({});
    console.log('Existing records deleted');
  } catch (error) {
    console.error('Error deleting existing records:', error);
  }

  for (const order of orders) {
    await prisma.orders.create({
      data: order,
    });
  }

  console.log('Seed data inserted');
}

main()
  .catch(e => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
