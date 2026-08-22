import { normalizarTexto } from "../utils/normalizarTexto"

const mapaTipoRefeicao = {
    cafe: "CAFE_DA_MANHA",
    almoco: "ALMOCO",
    jantar: "JANTAR",
    ceia: "CEIA",
    lanche: "LANCHE"
}
export function extrairTipoRefeicao(mensagem) {
    const dados = mensagem.split("\n")
    const refeicao = dados.shift()
    const dadosMensagem = {
        alimentos: dados,
        TipoRefeicao: normalizarTexto(refeicao.trim())
    }
    const refeicaoNormalizada = dadosMensagem.TipoRefeicao
    const tipoRefeicao = mapaTipoRefeicao[refeicaoNormalizada]
    if (!tipoRefeicao) {
        return { erro: true, mensagem: "tipo de refeição inválido" }
    }
    return {
        alimentos: dadosMensagem.alimentos.join("\n"),
        refeicao: tipoRefeicao
    }
}


