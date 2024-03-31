-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "mnemonics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "address" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_mnemonics_key" ON "Users"("mnemonics");

-- CreateIndex
CREATE UNIQUE INDEX "Users_address_key" ON "Users"("address");
