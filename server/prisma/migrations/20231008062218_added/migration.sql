-- CreateTable
CREATE TABLE "SAF" (
    "safID" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "titleID" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "descBrief" TEXT NOT NULL,
    "hrPerWeek" SMALLINT NOT NULL,
    "priorSubmission" SMALLINT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SAF_pkey" PRIMARY KEY ("safID")
);

-- CreateIndex
CREATE UNIQUE INDEX "SAF_studentID_key" ON "SAF"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "SAF_titleID_key" ON "SAF"("titleID");

-- AddForeignKey
ALTER TABLE "SAF" ADD CONSTRAINT "SAF_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SAF" ADD CONSTRAINT "SAF_titleID_fkey" FOREIGN KEY ("titleID") REFERENCES "Title"("titleID") ON DELETE RESTRICT ON UPDATE CASCADE;
