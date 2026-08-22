import { extrairTipoRefeicao } from "../services/extrairTipoRefeicao";
import { salvarRefeicao } from "../services/salvarRefeicao";
import { calcularMacros } from "../services/calcularMacros";
import { parse } from "../utils/parse";


async function processarRefeicao(mensagem) {
    const refeicao = extrairTipoRefeicao(mensagem)
    const alimentosTexto = refeicao.alimentos
    const tipoRefeicao = refeicao.refeicao
    const alimentos = parse(alimentosTexto)
    const tabelaNutricionalAlimento = await calcularMacros(alimentos)
    const resultadoTeste = await salvarRefeicao(tabelaNutricionalAlimento, tipoRefeicao)
    console.log(resultadoTeste)
}

processarRefeicao("Almoço \nArroz 150\nFeijão 100")