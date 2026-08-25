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
    const refeicaoTexto = dados.shift()
    const refeicaoNormalizada = normalizarTexto(refeicaoTexto.trim())
    const tipoRefeicao = mapaTipoRefeicao[refeicaoNormalizada]
    if (!tipoRefeicao) {
        return { erro: true, erros: [{ message: "Tipo de refeição inválido" }] }
    }
    return {
        alimentos: dados.join("\n"),
        refeicao: tipoRefeicao
    }
}
