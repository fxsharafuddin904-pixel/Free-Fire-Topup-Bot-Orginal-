const { Markup } = require("telegraf");
const { getAllPackages } = require("./database");

/* =========================================
   MAIN MENU
========================================= */

function mainButtons() {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback("💎 Diamond", "category_diamond"),
            Markup.button.callback("🎁 Weekly", "category_weekly"),
            Markup.button.callback("🎁 Mistry Box", "category_mistry")
        ],
        [
            Markup.button.callback("🔥 Offers", "category_offer")
        ]
    ]);
}

/* =========================================
   PACKAGE BUTTONS
   প্রতি লাইনে ৩টি
========================================= */

function packageButtons(category) {

    const packages = getAllPackages().filter(
        pkg => pkg.category === category
    );

    const rows = [];

    for (let i = 0; i < packages.length; i += 3) {

        const row = packages
            .slice(i, i + 3)
            .map(pkg =>
                Markup.button.callback(
                    `${pkg.name} - ৳${pkg.price}`,
                    `package_${pkg.id}`
                )
            );

        rows.push(row);
    }

    rows.push([
        Markup.button.callback("🔙 Back", "back_main")
    ]);

    return Markup.inlineKeyboard(rows);
}

/* =========================================
   PACKAGE DETAILS BUTTON
========================================= */

function packageDetailButtons(packageId) {

    return Markup.inlineKeyboard([
        [
            Markup.button.callback(
                "🛒 Buy Now",
                `buy_${packageId}`
            )
        ],
        [
            Markup.button.callback(
                "🔙 Back",
                "back_packages"
            )
        ]
    ]);
}

/* =========================================
   ADMIN CATEGORY BUTTONS
========================================= */

function adminCategoryButtons() {

    return Markup.inlineKeyboard([
        [
            Markup.button.callback(
                "💎 Diamond",
                "admin_category_diamond"
            ),
            Markup.button.callback(
                "🎁 Weekly",
                "admin_category_weekly"
            ),
            Markup.button.callback(
                "🎁 Mistry",
                "admin_category_mistry"
            )
        ],
        [
            Markup.button.callback(
                "🔥 Offers",
                "admin_category_offer"
            )
        ]
    ]);
}

/* =========================================
   ADMIN PACKAGE BUTTONS
========================================= */

function adminPackageButtons(category) {

    const packages = getAllPackages().filter(
        pkg => pkg.category === category
    );

    const rows = [];

    for (let i = 0; i < packages.length; i += 3) {

        const row = packages
            .slice(i, i + 3)
            .map(pkg =>
                Markup.button.callback(
                    `${pkg.name} | ৳${pkg.price}`,
                    `admin_package_${pkg.id}`
                )
            );

        rows.push(row);
    }

    rows.push([
        Markup.button.callback(
            "➕ Add Package",
            `admin_add_${category}`
        )
    ]);

    rows.push([
        Markup.button.callback(
            "🔙 Back",
            "admin_home"
        )
    ]);

    return Markup.inlineKeyboard(rows);
}

/* =========================================
   ADMIN PACKAGE ACTIONS
========================================= */

function adminPackageActions(packageId) {

    return Markup.inlineKeyboard([
        [
            Markup.button.callback(
                "✏️ Change Name",
                `edit_name_${packageId}`
            ),
            Markup.button.callback(
                "💰 Change Price",
                `edit_price_${packageId}`
            )
        ],
        [
            Markup.button.callback(
                "🗑️ Delete",
                `delete_package_${packageId}`
            )
        ],
        [
            Markup.button.callback(
                "🔙 Back",
                "admin_home"
            )
        ]
    ]);
}

/* =========================================
   EXPORTS
========================================= */

module.exports = {
    mainButtons,
    packageButtons,
    packageDetailButtons,
    adminCategoryButtons,
    adminPackageButtons,
    adminPackageActions
};
