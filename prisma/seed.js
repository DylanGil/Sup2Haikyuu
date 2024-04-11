import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const parcels = await prisma.parcel.findMany();
  console.log(parcels);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
