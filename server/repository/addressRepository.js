async function save(pool, streetNumber, streetName, postalCode, city) {
    const insertAddressQuery = `INSERT INTO Adresse (numeroAdresse, rueAdresse, codePostal, communeAdresse)
                                VALUES ('${streetNumber}', '${streetName}', '${postalCode}', '${city}')`;
    return await pool.promise().query(insertAddressQuery);
}

async function getInfo(pool, id, role) {
    let table = "";
    switch (role) {
        case "patient":
            table = "Patient";
            break;
        case "doctor":
            table = "Médecin";
            break;
        case "pharma":
            table = "Pharmacie";
            break;
    }
    const query = `SELECT numeroAdresse, rueAdresse, communeAdresse, codePostal FROM Adresse NATURAL JOIN ${table} WHERE (${id} = IDcompte);`;
    return await pool.promise().query(query);
}

async function update(pool, id, streetNumber, streetName, postalCode, city) {
    const updateAddressQuery = `UPDATE Adresse SET numeroAdresse = '${streetNumber}', rueAdresse = '${streetName}', codePostal = '${postalCode}', communeAdresse = '${city}' WHERE IDadresse = '${id}'`;
    return await pool.promise().query(updateAddressQuery);
}

exports.save = save;
exports.getInfo = getInfo;
exports.update = update;
