const { mainButtons } = require("./buttons");

function registerStart(bot) {
  bot.start((ctx) => {
    ctx.reply(
      "🔥 Welcome to Free Fire TopUp Bot!\n\nSelect an option below:",
      mainButtons()
    );
  });
}

module.exports = registerStart;
