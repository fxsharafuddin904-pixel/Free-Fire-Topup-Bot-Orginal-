const { getPackage } = require("./database");
const {
    mainButtons,
    packageButtons,
    packageDetailButtons
} = require("./buttons");

function registerStart(bot) {

    // /start
    bot.start(async (ctx) => {

        await ctx.reply(
`👋 <b>স্বাগতম Free Fire Top-Up Bot-এ! 💎</b>

━━━━━━━━━━━━━━━━━━

💎 আপনার পছন্দের Package নিচের Category থেকে নির্বাচন করুন।

🎁 Weekly
🎁 Mistry Box
🔥 Special Offers

⚡ দ্রুত ও সহজে আপনার পছন্দের Package নির্বাচন করুন।`,

            {
                parse_mode: "HTML",
                ...mainButtons()
            }
        );
    });


    /* ==========================
       CATEGORY
    ========================== */

    bot.action(/^category_(.+)$/, async (ctx) => {

        const category = ctx.match[1];

        let title = "📦 Packages";

        if (category === "diamond") {
            title = "💎 Diamond Packages";
        }

        if (category === "weekly") {
            title = "🎁 Weekly / Monthly";
        }

        if (category === "mistry") {
            title = "🎁 Mistry Box Packages";
        }

        if (category === "offer") {
            title = "🔥 Special Offers";
        }

        await ctx.answerCbQuery();

        return ctx.editMessageText(

`<b>${title}</b>

👇 আপনার পছন্দের Package নির্বাচন করুন:`,

            {
                parse_mode: "HTML",
                ...packageButtons(category)
            }
        );
    });


    /* ==========================
       PACKAGE DETAILS
    ========================== */

    bot.action(/^package_(.+)$/, async (ctx) => {

        const packageId = ctx.match[1];

        const pkg = getPackage(packageId);

        if (!pkg) {
            return ctx.answerCbQuery(
                "❌ Package পাওয়া যায়নি।",
                { show_alert: true }
            );
        }

        await ctx.answerCbQuery();

        return ctx.editMessageText(

`💎 <b>${pkg.name}</b>

━━━━━━━━━━━━━━━━━━

📦 Package:
<b>${pkg.description}</b>

💰 Price:
<b>৳${pkg.price}</b>

━━━━━━━━━━━━━━━━━━

👇 নিচের Button থেকে Continue করুন।`,

            {
                parse_mode: "HTML",
                ...packageDetailButtons(pkg.id)
            }
        );
    });


    /* ==========================
       BACK TO MAIN
    ========================== */

    bot.action("back_main", async (ctx) => {

        await ctx.answerCbQuery();

        return ctx.editMessageText(

`👋 <b>Free Fire Top-Up Bot</b>

👇 আপনার পছন্দের Category নির্বাচন করুন:`,

            {
                parse_mode: "HTML",
                ...mainButtons()
            }
        );
    });


    /* ==========================
       BACK TO PACKAGES
    ========================== */

    bot.action("back_packages", async (ctx) => {

        await ctx.answerCbQuery();

        return ctx.editMessageText(

`📦 <b>Packages</b>

👇 আপনার পছন্দের Package নির্বাচন করুন:`,

            {
                parse_mode: "HTML",
                ...mainButtons()
            }
        );
    });

}

module.exports = {
    registerStart
};
