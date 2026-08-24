import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { verificarMacro } from "../utils/verificarMacro.js";

dayjs.extend(utc)
dayjs.extend(timezone)

export async function agregacaoService() {
    const metaDiaria = await prisma.metaDiaria.findFirst()
    if (!metaDiaria) {
        return { erro: true, mensagem: "Nenhuma meta inserida!" }
    }
    const agoraBrasilia = dayjs().tz("America/Sao_Paulo")
    const inicioDia = agoraBrasilia.startOf('day')
    const fimDia = agoraBrasilia.endOf('day')
    const inicioUtc = inicioDia.utc().toDate()
    const fimUtc = fimDia.utc().toDate()
    const refeicoes = await prisma.refeicao.findMany({
        where: { dataHora: { gte: inicioUtc, lte: fimUtc } }
    })
    const totalConsumido = refeicoes.reduce((total, tabelaNutricional) => {
        return {
            kcal: total.kcal + tabelaNutricional.kcalCalculado,
            carboidrato: total.carboidrato + tabelaNutricional.carboidratoCalculado,
            proteina: total.proteina + tabelaNutricional.proteinaCalculado,
            gordura: total.gordura + tabelaNutricional.gorduraCalculado
        }
    }, {
        kcal: 0,
        carboidrato: 0,
        proteina: 0,
        gordura: 0
    })
    console.log(totalConsumido)
    const respostaKcal = verificarMacro(totalConsumido.kcal, metaDiaria.kcal, "kcal")
    const respostaCarbo = verificarMacro(totalConsumido.carboidrato, metaDiaria.carboidrato, "g")
    const respostaProteina = verificarMacro(totalConsumido.proteina, metaDiaria.proteina, "g")
    const respostaGordura = verificarMacro(totalConsumido.gordura, metaDiaria.gordura, "g")

    return {
        kcal: {
            meta: metaDiaria.kcal,
            consumido: totalConsumido.kcal,
            saldo: respostaKcal,
        },
        carboidrato: {
            meta: metaDiaria.carboidrato,
            consumido: totalConsumido.carboidrato,
            saldo: respostaCarbo,
        },
        proteina: {
            meta: metaDiaria.proteina,
            consumido: totalConsumido.proteina,
            saldo: respostaProteina,
        },
        gordura: {
            meta: metaDiaria.gordura,
            consumido: totalConsumido.gordura,
            saldo: respostaGordura,
        }

    }
}

agregacaoService()