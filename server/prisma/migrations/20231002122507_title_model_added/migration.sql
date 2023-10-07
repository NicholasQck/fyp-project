-- CreateTable
CREATE TABLE "Title" (
    "titleID" TEXT NOT NULL,
    "proposedBy" TEXT NOT NULL,
    "titleName" TEXT NOT NULL,
    "fieldArea" TEXT NOT NULL,
    "titleDesc" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("titleID")
);

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_proposedBy_fkey" FOREIGN KEY ("proposedBy") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
