-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL,
    "roleID" SMALLINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);
