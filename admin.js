const config = require("./config");

const {
    getPackage,
    addPackage,
    updatePackage,
    deletePackage
} = require("./database");

const {
    adminCategoryButtons,
    adminPackageButtons,
    adminPackageActions
} = require("./buttons");

function registerAdmin(bot) {

    /* ==========================
       ADMIN CHECK
    ========================== */

    function isAdmin(ctx) {
        return Number(ctx.from.id) === Number(config.ADMIN_ID);
    }


    /* ==========================
       /admin
    ========================== */

    bot.command("admin", async (ctx) => {

        if (!isAdmin(ctx)) return;

        return ctx.reply(
`👑 <b>Admin Panel</b>

━━━━━━━━━━━━━━━━━━

📦 এখান থেকে Package Manage করুন।

💎 Diamond
🎁 Weekly / Monthly
🎁 Mistry Box
🔥 Offers

━━━━━━━━━━━━━━━━━━

👇 একটি Category নির্বাচন করুন:`,

            {
                parse_mode: "HTML",
                ...adminCategoryButtons()
            }
        );
    });


    /* ==========================
       ADMIN HOME
    ========================== */

    bot.action("admin_home", async (ctx) => {

        if (!isAdmin(ctx)) return;

        await ctx.answerCbQuery();

        return ctx.editMessageText(
`👑 <b>Admin Panel</b>

👇 Category নির্বাচন করুন:`,

            {
                parse_mode: "HTML",
                ...adminCategoryButtons()
            }
        );
    });


    /* ==========================
       ADMIN CATEGORY
    ========================== */

    bot.action(
        /^admin_category_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const category = ctx.match[1];

            await ctx.answerCbQuery();

            return ctx.editMessageText(
`⚙️ <b>Package Management</b>

Category:
<b>${category}</b>

👇 যে Package পরিবর্তন করতে চান সেটিতে Click করুন:`,

                {
                    parse_mode: "HTML",
                    ...adminPackageButtons(category)
                }
            );
        }
    );


    /* ==========================
       SELECT PACKAGE
    ========================== */

    bot.action(
        /^admin_package_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const packageId = ctx.match[1];

            const pkg = getPackage(packageId);

            if (!pkg) {
                return ctx.answerCbQuery(
                    "❌ Package পাওয়া যায়নি।",
                    {
                        show_alert: true
                    }
                );
            }

            await ctx.answerCbQuery();

            return ctx.editMessageText(
`⚙️ <b>Package Settings</b>

━━━━━━━━━━━━━━━━━━

📦 Name:
<b>${pkg.name}</b>

💰 Price:
<b>৳${pkg.price}</b>

📝 Description:
<b>${pkg.description}</b>

━━━━━━━━━━━━━━━━━━

👇 কী পরিবর্তন করতে চান?`,

                {
                    parse_mode: "HTML",
                    ...adminPackageActions(pkg.id)
                }
            );
        }
    );


    /* ==========================
       CHANGE PRICE
    ========================== */

    bot.action(
        /^edit_price_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const packageId = ctx.match[1];

            const pkg = getPackage(packageId);

            if (!pkg) {
                return ctx.answerCbQuery(
                    "❌ Package পাওয়া যায়নি।",
                    {
                        show_alert: true
                    }
                );
            }

            ctx.session = ctx.session || {};

            ctx.session.editing = {
                type: "price",
                packageId
            };

            await ctx.answerCbQuery();

            return ctx.reply(
`💰 <b>Price Change</b>

Package:
<b>${pkg.name}</b>

বর্তমান Price:
<b>৳${pkg.price}</b>

নতুন Price লিখে পাঠান।

উদাহরণ:
<code>299</code>`,

                {
                    parse_mode: "HTML"
                }
            );
        }
    );


    /* ==========================
       CHANGE NAME
    ========================== */

    bot.action(
        /^edit_name_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const packageId = ctx.match[1];

            const pkg = getPackage(packageId);

            if (!pkg) {
                return ctx.answerCbQuery(
                    "❌ Package পাওয়া যায়নি।",
                    {
                        show_alert: true
                    }
                );
            }

            ctx.session = ctx.session || {};

            ctx.session.editing = {
                type: "name",
                packageId
            };

            await ctx.answerCbQuery();

            return ctx.reply(
`✏️ <b>Package Name Change</b>

বর্তমান Name:
<b>${pkg.name}</b>

নতুন Name লিখে পাঠান।

উদাহরণ:
<code>999 Diamond</code>`,

                {
                    parse_mode: "HTML"
                }
            );
        }
    );


    /* ==========================
       DELETE PACKAGE
    ========================== */

    bot.action(
        /^delete_package_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const packageId = ctx.match[1];

            const pkg = getPackage(packageId);

            if (!pkg) {
                return ctx.answerCbQuery(
                    "❌ Package পাওয়া যায়নি।",
                    {
                        show_alert: true
                    }
                );
            }

            deletePackage(packageId);

            await ctx.answerCbQuery(
                "Package Deleted ✅"
            );

            return ctx.editMessageText(
`🗑️ <b>Package Deleted</b>

<b>${pkg.name}</b>

Package টি সফলভাবে Delete করা হয়েছে।`,

                {
                    parse_mode: "HTML",
                    ...adminCategoryButtons()
                }
            );
        }
    );


    /* ==========================
       ADD PACKAGE
    ========================== */

    bot.action(
        /^admin_add_(.+)$/,
        async (ctx) => {

            if (!isAdmin(ctx)) return;

            const category = ctx.match[1];

            ctx.session = ctx.session || {};

            ctx.session.adding = {
                category,
                step: "name"
            };

            await ctx.answerCbQuery();

            return ctx.reply(
`➕ <b>New Package Add</b>

Category:
<b>${category}</b>

প্রথমে Package-এর Name পাঠান।

উদাহরণ:
<code>7494 Diamond</code>`,

                {
                    parse_mode: "HTML"
                }
            );
        }
    );


    /* ==========================
       ADMIN TEXT HANDLER
    ========================== */

    bot.on("text", async (ctx) => {

        if (!isAdmin(ctx)) return;

        if (!ctx.session) return;


        /* ======================
           EDIT EXISTING PACKAGE
        ====================== */

        if (ctx.session.editing) {

            const {
                type,
                packageId
            } = ctx.session.editing;

            const value =
                ctx.message.text.trim();

            const pkg =
                getPackage(packageId);

            if (!pkg) {

                ctx.session.editing = null;

                return ctx.reply(
                    "❌ Package পাওয়া যায়নি।"
                );
            }


            /* CHANGE PRICE */

            if (type === "price") {

                const price =
                    Number(value);

                if (
                    !Number.isFinite(price) ||
                    price < 0
                ) {

                    return ctx.reply(
`❌ সঠিক Price দিন।

উদাহরণ:
<code>299</code>`,

                        {
                            parse_mode: "HTML"
                        }
                    );
                }

                updatePackage(
                    packageId,
                    {
                        price
                    }
                );

                ctx.session.editing = null;

                return ctx.reply(
`✅ <b>Price Updated</b>

📦 ${pkg.name}

💰 নতুন Price:
<b>৳${price}</b>`,

                    {
                        parse_mode: "HTML"
                    }
                );
            }


            /* CHANGE NAME */

            if (type === "name") {

                if (!value) {

                    return ctx.reply(
                        "❌ Package Name খালি রাখা যাবে না।"
                    );
                }

                updatePackage(
                    packageId,
                    {
                        name: value,
                        description: value
                    }
                );

                ctx.session.editing = null;

                return ctx.reply(
`✅ <b>Name Updated</b>

নতুন Name:
<b>${value}</b>`,

                    {
                        parse_mode: "HTML"
                    }
                );
            }
        }


        /* ======================
           ADD NEW PACKAGE
        ====================== */

        if (ctx.session.adding) {

            const adding =
                ctx.session.adding;

            const value =
                ctx.message.text.trim();


            /* NAME */

            if (adding.step === "name") {

                adding.name = value;
                adding.step = "price";

                return ctx.reply(
`💰 এখন Package-এর Price পাঠান।

উদাহরণ:
<code>4747</code>`,

                    {
                        parse_mode: "HTML"
                    }
                );
            }


            /* PRICE */

            if (adding.step === "price") {

                const price =
                    Number(value);

                if (
                    !Number.isFinite(price) ||
                    price < 0
                ) {

                    return ctx.reply(
                        "❌ সঠিক Price দিন।"
                    );
                }

                const id =
                    `${adding.category}_${Date.now()}`;

                addPackage({

                    id,

                    category:
                        adding.category,

                    name:
                        adding.name,

                    price,

                    description:
                        adding.name

                });

                ctx.session.adding = null;

                return ctx.reply(
`✅ <b>New Package Added!</b>

📦 Name:
<b>${adding.name}</b>

💰 Price:
<b>৳${price}</b>

📂 Category:
<b>${adding.category}</b>`,

                    {
                        parse_mode: "HTML"
                    }
                );
            }
        }

    });

}

module.exports = {
    registerAdmin
};
