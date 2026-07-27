const { Telegraf, session } = require("telegraf");
const config = require("./config");

const { registerStart } = require("./start");
const { registerAdmin } = require("./admin");

const bot = new Telegraf(config.BOT_TOKEN);

/* =========================================
   SESSION
========================================= */

bot.use(session());

/* =========================================
   REGISTER MODULES
========================================= */

registerStart(bot);
registerAdmin(bot);

/* =========================================
   BOT START
========================================= */

bot.launch(() => {

    console.log("━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🤖 Free Fire Top-Up Bot");
    console.log("✅ Bot Online");
    console.log("━━━━━━━━━━━━━━━━━━━━━━");

});

/* =========================================
   STOP BOT
========================================= */

process.once("SIGINT", () => {
    bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
});
