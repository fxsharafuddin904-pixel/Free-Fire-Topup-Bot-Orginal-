const { Markup } = require("telegraf");

function mainButtons() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("💎 Top Up", "topup")],
    [Markup.button.callback("📦 Packages", "packages")],
    [Markup.button.callback("👤 My Account", "account")]
  ]);
}

module.exports = { mainButtons };
