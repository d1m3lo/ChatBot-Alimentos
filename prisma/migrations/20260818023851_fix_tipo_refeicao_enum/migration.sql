/*
  Warnings:

  - Changed the type of `tipoRefeicao` on the `Refeicao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Refeicao" DROP COLUMN "tipoRefeicao",
ADD COLUMN     "tipoRefeicao" "TipoRefeicao" NOT NULL;
