import prisma from './util/db';

import fs from 'fs';

async function main() {
  const problems = await prisma.problems.findMany();

  // Prepare data to export
  const dataToExport = {
    problems,
  };

  // Write the data to a JSON file
  fs.writeFileSync('exportedData.json', JSON.stringify(dataToExport, null, 2));
  console.log('Data exported successfully to exportedData.json');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });