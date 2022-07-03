async function save(pool, streetNumber, streetName, postalCode, city) {
    const insertAddressQuery = `INSERT INTO Adresse (numeroAdresse, rueAdresse, codePostal, communeAdresse)
                                VALUES ('${streetNumber}', '${streetName}', '${postalCode}', '${city}')`;
    return await pool.promise().query(insertAddressQuery);
}

module.exports = {
    save
}
