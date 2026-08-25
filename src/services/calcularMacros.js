import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


export async function calcularMacros(itens) {
    const nomes = itens.map(item => item.nome);

    const alimentos = await prisma.alimento.findMany({
        where: {
            nomeBusca: {
                in: nomes
            }
        }
    });
    const resultados = itens.map(item => {
        const alimento = alimentos.find(a => a.nomeBusca === item.nome)
        if (!alimento) {
            return { erro: true, message: `Alimento ${item.nome} não encontrado` }
        }
        const kcal = (Number(item.quantidadeG) * alimento.kcal) / alimento.porcaoReferenciaG
        const carboidrato = (Number(item.quantidadeG) * alimento.carboidrato) / alimento.porcaoReferenciaG
        const proteina = (Number(item.quantidadeG) * alimento.proteina) / alimento.porcaoReferenciaG
        const gordura = (Number(item.quantidadeG) * alimento.gordura) / alimento.porcaoReferenciaG
        return {
            alimentoId: alimento.id,
            nome: item.nome,
            quantidadeG: Number(item.quantidadeG),
            kcal,
            carboidrato,
            proteina,
            gordura
        }
    })
    const erros = resultados.filter(item => item.erro === true)
    const validos = resultados.filter(item => item.erro !== true)
    return{validos,erros}

}
