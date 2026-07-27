const fs = require("fs");

const DB_FILE = "./packages.json";

function loadPackages() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, "[]");
    }

    return JSON.parse(
        fs.readFileSync(DB_FILE, "utf8")
    );
}

function savePackages(packages) {
    fs.writeFileSync(
        DB_FILE,
        JSON.stringify(packages, null, 2)
    );
}

function getAllPackages() {
    return loadPackages();
}

function getPackage(id) {
    const packages = loadPackages();

    return packages.find(
        pkg => String(pkg.id) === String(id)
    );
}

function addPackage(data) {
    const packages = loadPackages();

    packages.push(data);

    savePackages(packages);
}

function updatePackage(id, data) {
    const packages = loadPackages();

    const index = packages.findIndex(
        pkg => String(pkg.id) === String(id)
    );

    if (index === -1) return false;

    packages[index] = {
        ...packages[index],
        ...data
    };

    savePackages(packages);

    return true;
}

function deletePackage(id) {
    const packages = loadPackages();

    const filtered = packages.filter(
        pkg => String(pkg.id) !== String(id)
    );

    if (filtered.length === packages.length) {
        return false;
    }

    savePackages(filtered);

    return true;
}

module.exports = {
    getAllPackages,
    getPackage,
    addPackage,
    updatePackage,
    deletePackage
};
