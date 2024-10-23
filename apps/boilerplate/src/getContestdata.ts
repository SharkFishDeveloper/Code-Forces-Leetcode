import prisma from './util/db';

import fs from 'fs';

async function main() {
  const contests = await prisma.contest.findMany();

  // Prepare data to export
  const dataToExport = {
    contests,
  };

  // Write the data to a JSON file
  fs.writeFileSync('contestDataExported.json', JSON.stringify(dataToExport, null, 2));
  console.log('Data exported successfully to contestDataExported.json');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });