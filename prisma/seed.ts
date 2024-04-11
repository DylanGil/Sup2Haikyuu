import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const karasuno = await prisma.team.create({
    data: {
      name: "Karasuno",
      players: {
        create: [
          {
            name: "Hinata Shoyo",
            number: 10,
          },
          {
            name: "Kageyama Tobio",
            number: 9,
          },
        ],
      },
    },
  });

  const nekoma = await prisma.team.create({
    data: {
      name: "Nekoma",
      players: {
        create: [
          {
            name: "Kuroo Tetsuro",
            number: 1,
          },
          {
            name: "Kenma Kozume",
            number: 5,
          },
        ],
      },
    },
  });

  const fukurodani = await prisma.team.create({
    data: {
      name: "Fukurodani",
      players: {
        create: [
          {
            name: "Bokuto Koutarou",
            number: 4,
          },
          {
            name: "Akaashi Keiji",
            number: 5,
          },
        ],
      },
    },
  });

  const aobaJohsai = await prisma.team.create({
    data: {
      name: "Aoba Johsai",
      players: {
        create: [
          {
            name: "Oikawa Tooru",
            number: 1,
          },
          {
            name: "Iwaizumi Hajime",
            number: 5,
          },
        ],
      },
    },
  });

  const shiratorizawa = await prisma.team.create({
    data: {
      name: "Shiratorizawa",
      players: {
        create: [
          {
            name: "Ushijima Wakatoshi",
            number: 1,
          },
          {
            name: "Tendou Satori",
            number: 5,
          },
        ],
      },
    },
  });

  const summerTournament = await prisma.tournament.create({
    data: {
      name: "Summer Tournament",
      matches: {
        create: [
          {
            team1_id: karasuno.id,
            team2_id: aobaJohsai.id,
            winner_id: karasuno.id,
            team1_score: 2,
            team2_score: 1,
            match_date: new Date("2021-10-01"),
          },
          {
            team1_id: nekoma.id,
            team2_id: fukurodani.id,
            winner_id: fukurodani.id,
            team1_score: 0,
            team2_score: 2,
            match_date: new Date("2021-10-02"),
          },
        ],
      },
    },
  });

  const winterTournament = await prisma.tournament.create({
    data: {
      name: "Winter Tournament",
      matches: {
        create: [
          {
            team1_id: karasuno.id,
            team2_id: nekoma.id,
            winner_id: karasuno.id,
            team1_score: 2,
            team2_score: 1,
            match_date: new Date("2021-12-01"),
          },
          {
            team1_id: fukurodani.id,
            team2_id: aobaJohsai.id,
            winner_id: fukurodani.id,
            team1_score: 2,
            team2_score: 0,
            match_date: new Date("2021-12-02"),
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
