import { normalizarTexto } from "./normalizarTexto.js"
const regex = /^(.+)\s+(\d+)$/
export function parse(mensagem) {

    const dados = mensagem.split("\n").map((m) => {
        const formatacaoM = m.trim()
        const match = formatacaoM.replace(/\s+/g, " ").match(regex)
        if (match === null) {
            return { erro: true, formatacaoM }
        }
        return {
            nome: normalizarTexto(match[1]),
            quantidadeG: match[2]
        }
    })
    const erros = dados.filter(item => item.erro === true)
    const validos = dados.filter(item => item.erro !== true)

    if (erros.length > 0) {
        return erros 
    }
    return validos
}

