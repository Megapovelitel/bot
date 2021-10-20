const { Telegraf } = require("telegraf");
require("dotenv").config();

const codes = require("./codes");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("text", (ctx) => {
  const id = ctx.message.chat.id;
  const text = ctx.update.message.text;

  const answerBack = (txt) => {
    if (codes[txt] === undefined) {
      ctx.telegram.sendMessage(id, "Unknown http code, отправлен на комиссию");
    } else {
      ctx.telegram.sendPhoto(id, `https://http.cat/${txt}`);
    }
  };

  const txt = validate(text);

  if (txt) {
    answerBack(txt);
  }
});

bot.launch();

const text = "#404q";

const validate = (text) => {
  if (typeof text !== "string") return false;

  const matched = text.match("#[0-9][0-9][0-9]");

  if (matched === null) return false;

  return matched[0].replace("#", "");
};

console.log('UP')