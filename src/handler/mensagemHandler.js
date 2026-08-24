import { extrairTipoRefeicao } from "../services/extrairTipoRefeicao";
import { salvarRefeicao } from "../services/salvarRefeicao";
import { calcularMacros } from "../services/calcularMacros";
import { parse } from "../utils/parse";
import { agregacaoService } from "../services/agregacaoService";


async function mensagemHandler(mensagem) {
    const refeicao = extrairTipoRefeicao(mensagem)
    const alimentosTexto = refeicao.alimentos
    const tipoRefeicao = refeicao.refeicao
    const alimentos = parse(alimentosTexto)
    const tabelaNutricionalAlimento = await calcularMacros(alimentos)
    const resultadoTeste = await salvarRefeicao(tabelaNutricionalAlimento, tipoRefeicao)
    const resultado = await agregacaoService()
}

mensagemHandler("Almoço \nArroz 150\nFeijão 100")