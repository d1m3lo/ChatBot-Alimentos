-- CreateEnum
CREATE TYPE "TipoRefeicao" AS ENUM ('CAFE_DA_MANHA', 'ALMOCO', 'JANTAR', 'CEIA', 'LANCHE');

-- CreateTable
CREATE TABLE "Alimento" (
    "id" SERIAL NOT NULL,
    "nomeAlimento" TEXT NOT NULL,
    "nomeBusca" TEXT NOT NULL,
    "porcaoReferenciaG" DOUBLE PRECISION NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "carboidrato" DOUBLE PRECISION NOT NULL,
    "proteina" DOUBLE PRECISION NOT NULL,
    "gordura" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaDiaria" (
    "id" SERIAL NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "carboidrato" DOUBLE PRECISION NOT NULL,
    "proteina" DOUBLE PRECISION NOT NULL,
    "gordura" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MetaDiaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refeicao" (
    "id" SERIAL NOT NULL,
    "alimentoId" INTEGER NOT NULL,
    "quantidadeG" DOUBLE PRECISION NOT NULL,
    "tipoRefeicao" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "kcalCalculado" DOUBLE PRECISION NOT NULL,
    "carboidratoCalculado" DOUBLE PRECISION NOT NULL,
    "proteinaCalculado" DOUBLE PRECISION NOT NULL,
    "gorduraCalculado" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Refeicao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refeicao" ADD CONSTRAINT "Refeicao_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "Alimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
