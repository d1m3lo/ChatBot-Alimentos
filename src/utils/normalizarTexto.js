export const normalizarTexto = (palavra) => {
    return palavra
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
}

