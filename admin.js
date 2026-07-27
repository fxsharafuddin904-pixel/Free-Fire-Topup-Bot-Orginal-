function registerAdmin(bot) {
  bot.command("admin", (ctx) => {
    ctx.reply("🔐 Admin panel placeholder.");
  });
}

module.exports = registerAdmin;
