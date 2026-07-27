const { Telegraf } = require("telegraf");
const config = require("./config");
const registerStart = require("./start");
const registerAdmin = require("./admin");

if (!config.BOT_TOKEN) {
  console.error("BOT_TOKEN is missing.");
  process.exit(1);
}

const bot = new Telegraf(config.BOT_TOKEN);

registerStart(bot);
registerAdmin(bot);

bot.action("topup", (ctx) => ctx.reply("💎 Top Up menu coming soon."));
bot.action("packages", (ctx) => ctx.reply("📦 Packages menu coming soon."));
bot.action("account", (ctx) => ctx.reply("👤 Account menu coming soon."));

bot.launch();
console.log("🤖 Free Fire TopUp Bot is running.");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
