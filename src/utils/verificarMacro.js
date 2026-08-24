export function verificarMacro(consumido, meta, unidade) {
    if (consumido > meta) {
        return `excedeu ${(consumido - meta)} ${unidade} `
    } else if (consumido === meta) {
        return `você bateu a meta de ${meta} ${unidade}`
    } else if (consumido === 0) {
return `Você consumiu um total de  ${consumido} ${unidade}`
    } else {
        return `Ainda falta para consumo ${meta - consumido} ${unidade}`
    }
}