const {select_medicine, select_medicine_find_name, select_medicine_find_manufacture_country,
    select_medicine_find_count_in_package, select_medicine_find_prescription, select_medicine_find_category,
    add_basket} = require("../DataBase/db");
const {parse} = require("url");
module.exports = function(app, db) {
    const qs = require('qs');
    app.get('/data/medicine', (req, res) => {
        select_medicine().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.get('/data/medicine/filter/name', (req, res) => {
        const name = req.query.name
        if (name) {
            const regex_name = new RegExp(name, 'i');
            module.exports = {regex_name};
        }

        select_medicine_find_name().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.get('/data/medicine/filter/manufacture_country', (req, res) => {
        const manufacture_country = req.query.name
        if (manufacture_country) {
            const regex_manufacture_country = new RegExp(manufacture_country, 'i');
            module.exports = {regex_manufacture_country};
        }

        select_medicine_find_manufacture_country().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.get('/data/medicine/filter/count_in_package/:id', (req, res) => {
        const count_in_package = req.params.id
        module.exports = {count_in_package}
        select_medicine_find_count_in_package().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.get('/data/medicine/filter/prescription', (req, res) => {
        const prescription = req.query.name
        if (prescription) {
            module.exports = {prescription};
        }

        select_medicine_find_prescription().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.get('/data/medicine/filter/category', (req, res) => {
        const category_name = req.query.name
        if (category_name) {
            module.exports = {category_name};
        }

        select_medicine_find_category().then(AllDocuments => {
            console.log(AllDocuments)
            res.send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });
    app.post('/basket', (req, res) => {
        const basket_info =qs.parse(req.query);

        let basket = basket_info
        if (basket) {
            module.exports = {basket};
        }
        add_basket().then(AllDocuments => {
            res.status(200).send(AllDocuments)
        }).catch(err => {
            console.error('Ошибка при подключении к базе данных:', err);
            res.status(500).send('Ошибка при подключении к базе данных');
        });
    });

};

