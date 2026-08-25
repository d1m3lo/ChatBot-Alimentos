import { extrairTipoRefeicao } from "../services/extrairTipoRefeicao";
import { salvarRefeicao } from "../services/salvarRefeicao";
import { calcularMacros } from "../services/calcularMacros";
import { parse } from "../utils/parse";
import { agregacaoService } from "../services/agregacaoService";


export async function processarRefeicao(mensagem) {
    const refeicao = extrairTipoRefeicao(mensagem)
    if (refeicao.erro === true) {
        return { resultado: null, erros: refeicao.erros }
    }
    const alimentosTexto = refeicao.alimentos
    const tipoRefeicao = refeicao.refeicao
    const alimentos = parse(alimentosTexto)
    const validosAlimentos = alimentos.validos
    const errosAlimentos = alimentos.erros
    if (validosAlimentos.length === 0) {
        return { resultado: null, erros: errosAlimentos }
    }
    const tabelaNutricionalAlimento = await calcularMacros(validosAlimentos)
    const validosTabela = tabelaNutricionalAlimento.validos
    const errosTabela = tabelaNutricionalAlimento.erros
    if (validosTabela.length === 0) {
        return { resultado: null, erros: [...errosAlimentos, ...errosTabela] }
    }
    await salvarRefeicao(validosTabela, tipoRefeicao)
    const resultado = await agregacaoService()
    return { resultado, erros: [...errosAlimentos, ...errosTabela] }
}