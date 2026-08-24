import { extrairTipoRefeicao } from "../services/extrairTipoRefeicao";
import { salvarRefeicao } from "../services/salvarRefeicao";
import { calcularMacros } from "../services/calcularMacros";
import { parse } from "../utils/parse";
import { agregacaoService } from "../services/agregacaoService";


async function processarRefeicao(mensagem) {
    const refeicao = extrairTipoRefeicao(mensagem)
    const alimentosTexto = refeicao.alimentos
    const tipoRefeicao = refeicao.refeicao
    const alimentos = parse(alimentosTexto)
    const tabelaNutricionalAlimento = await calcularMacros(alimentos)
    const validos = tabelaNutricionalAlimento.validos
    const erros = tabelaNutricionalAlimento.erros
    if (validos.length === 0) {
        return { resultado: null, erros }
    }
    await salvarRefeicao(validos, tipoRefeicao)
    const resultado = await agregacaoService()
    return { resultado, erros }
}