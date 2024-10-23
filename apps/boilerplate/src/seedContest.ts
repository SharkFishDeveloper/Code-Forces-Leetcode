import prisma from './util/db';

import fs from 'fs';


async function main() {
  // Read the exported data
  const contestData = JSON.parse(fs.readFileSync('contestDataExported.json', 'utf-8'));

  for (const contest of contestData.contests) {
    try {
      // Log the contest being inserted to debug the issue
      console.log("Inserting contest:", contest);

      await prisma.contest.create({
        data: {
          name: contest.name, // Ensure this is correct
          problemsId: contest.problemsId, // Array of strings
          score: contest.score, // Array of strings (or numbers if required)
          startTime: new Date(contest.startTime), // Date conversion
        },
      });

      console.log(`Contest ${contest.name} seeded successfully.`);
    } catch (error) {
      console.error("Error seeding contest data for", contest.name, "->", error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });