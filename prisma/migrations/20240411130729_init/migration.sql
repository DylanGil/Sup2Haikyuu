-- CreateTable
CREATE TABLE "player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "team_id" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team1_id" INTEGER,
    "team2_id" INTEGER,
    "winner_id" INTEGER,
    "team1_score" INTEGER NOT NULL,
    "team2_score" INTEGER NOT NULL,
    "tournament_id" INTEGER,
    "match_date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "match_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "match_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournament" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
