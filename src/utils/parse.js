import { normalizarTexto } from "./normalizarTexto.js"
const regex = /^(.+)\s+(\d+)$/
export function parse(texto) {
    const dados = texto.split("\n").map((m) => {
        const formatacaoM = m.trim()
        const match = formatacaoM.replace(/\s+/g, " ").match(regex)
        if (match === null) {
            return { erro: true, mensagem: `Informação faltando perto de ${formatacaoM}, favor inserir os valores` }
        }
        return {
            nome: normalizarTexto(match[1]),
            quantidadeG: match[2]
        }
    })
    const erros = dados.filter(item => item.erro === true)
    const validos = dados.filter(item => item.erro !== true)
    return { validos, erros }
}


