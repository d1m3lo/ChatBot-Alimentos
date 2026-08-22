import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

export async function salvarRefeicao(validos, tipoRefeicao) {
    const dados = validos.map(item => {
        return {
            alimentoId: item.alimentoId,
            quantidadeG: item.quantidadeG,
            tipoRefeicao: tipoRefeicao,
            dataHora: new Date(),
            kcalCalculado: item.kcal,
            carboidratoCalculado: item.carboidrato,
            proteinaCalculado: item.proteina,
            gorduraCalculado: item.gordura
        }
    })
    await prisma.refeicao.createMany({ data: dados })
    console.log("Refeição inserida.")
}

salvarRefeicao()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())