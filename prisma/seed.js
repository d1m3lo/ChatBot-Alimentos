import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function seed() {
    const alimentos = [
        { nomeAlimento: "Arroz", nomeBusca: "arroz", porcaoReferenciaG: 100, kcal: 131, carboidrato: 30, proteina: 2.4, gordura: 0.6 },
        { nomeAlimento: "Feijão", nomeBusca: "feijao", porcaoReferenciaG: 100, kcal: 77, carboidrato: 14, proteina: 4.5, gordura: 0.5 },
        { nomeAlimento: "Ovo cozido", nomeBusca: "ovo cozido", porcaoReferenciaG: 100, kcal: 146, carboidrato: 0.6, proteina: 13.3, gordura: 9.5 },
        { nomeAlimento: "Ovo frito", nomeBusca: "ovo frito", porcaoReferenciaG: 100, kcal: 240, carboidrato: 1.2, proteina: 15.6, gordura: 18.6 },
        { nomeAlimento: "Banana", nomeBusca: "banana", porcaoReferenciaG: 100, kcal: 90, carboidrato: 23.8, proteina: 1.4, gordura: 0.1 },
        { nomeAlimento: "Frango grelhado", nomeBusca: "frango grelhado", porcaoReferenciaG: 100, kcal: 159, carboidrato: 0, proteina: 32, gordura: 2.5 },
        { nomeAlimento: "Contra filé", nomeBusca: "contra file", porcaoReferenciaG: 100, kcal: 194, carboidrato: 0, proteina: 35.9, gordura: 4.5 },
        { nomeAlimento: "Carne moida", nomeBusca: "carne moida", porcaoReferenciaG: 100, kcal: 212, carboidrato: 0, proteina: 26.7, gordura: 10.9 },
        { nomeAlimento: "Batata cozida", nomeBusca: "batata cozida", porcaoReferenciaG: 100, kcal: 52, carboidrato: 11.9, proteina: 1.2, gordura: 0 },
        { nomeAlimento: "Batata frita", nomeBusca: "batata frita", porcaoReferenciaG: 100, kcal: 137, carboidrato: 20, proteina: 2.10, gordura: 4.8 }
    ]
    await prisma.alimento.createMany({ data: alimentos })
    console.log(`${alimentos.length} alimentos inseridos.`)
}

seed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())

