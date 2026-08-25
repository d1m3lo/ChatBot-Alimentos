import { Bot } from "grammy"
import { processarRefeicao } from "../services/processarRefeicao";
import 'dotenv/config'
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
bot.command("start", (ctx) => ctx.reply("Bot pronto! Me manda sua refeição no formato: tipo de refeição na primeira linha, alimentos e quantidade nas linhas seguintes."))
bot.on("message:text", async (ctx) => {
    const { resultado, erros } = await processarRefeicao(ctx.message.text)
    if (erros.length > 0) {
        const mensagemErro = erros.map((erro) => erro.message).join("\n")
        ctx.reply(mensagemErro)
    }
    if (!resultado) {
        return
    }
    const resultadoRef = [`📊 Consumo diário`, `🔥 Calorias`, `meta: ${resultado.kcal.meta}`, `consumido: ${resultado.kcal.consumido}`, `saldo: ${resultado.kcal.saldo}`, ``, `🍚 Carboidratos`, `meta: ${resultado.carboidrato.meta}`, `consumido: ${resultado.carboidrato.consumido}`, `saldo: ${resultado.carboidrato.saldo}`, ``, `🥩 Proteínas`, `meta: ${resultado.proteina.meta}`, `consumido: ${resultado.proteina.consumido}`, `saldo: ${resultado.proteina.saldo}`, ``, `🥑 Gorduras`, `meta: ${resultado.gordura.meta}`, `consumido: ${resultado.gordura.consumido}`, `saldo: ${resultado.gordura.saldo}`]
    const mensagemFormatada = resultadoRef.join("\n")
    ctx.reply(mensagemFormatada)
})

bot.start()

