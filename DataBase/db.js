const {MongoClient: MongoClient} = require('mongodb')
const MongoDBclient = new MongoClient('mongodb://127.0.0.1:27017')
const { ObjectId } = require('mongodb');

const select_medicine = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const [result_select_medicine] = await Promise.all([MongoDBclient
            .db('pharmacy')
            .collection('medicine')
            .find()
            .toArray()]);
        await MongoDBclient.close()
        return result_select_medicine
    } catch (e) {
        console.log(e)
    }
}
const select_medicine_find_name = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const regex_name = require('../route/routes')
        const [result_select_medicine_find_name] = await Promise.all([MongoDBclient
            .db('pharmacy')
            .collection('medicine')
            .find({name: {$regex: regex_name.regex_name}})
            .toArray()])
        await MongoDBclient.close()
        return result_select_medicine_find_name
    } catch (e) {
        console.log(e)
    }
}

const select_medicine_find_manufacture_country = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const regex_manufacture_country = require('../route/routes')
        const result_select_medicine_find_manufacture_country = await MongoDBclient.db('pharmacy')
            .collection('medicine').find({manufacture_country:{$regex: regex_manufacture_country
                        .regex_manufacture_country}}).toArray()
        await MongoDBclient.close()
        return result_select_medicine_find_manufacture_country
    } catch (e) {
        console.log(e)
    }
}
const select_medicine_find_count_in_package = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const count_in_package = require('../route/routes')
        const [result_select_medicine_find_count_in_package] = await Promise.all([MongoDBclient
            .db('pharmacy')
            .collection('medicine')
            .find({count_in_package: Number(count_in_package.count_in_package)})
            .toArray()])
        await MongoDBclient.close()
        return result_select_medicine_find_count_in_package
    } catch (e) {
        console.log(e)
    }
}
const select_medicine_find_prescription = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const prescription = require('../route/routes')
        let data
        data = prescription.prescription === "true";
        const [result_select_medicine_find_prescription] = await Promise.all([MongoDBclient
            .db('pharmacy')
            .collection('medicine')
            .find({prescription: data}).toArray()]);
        await MongoDBclient.close()
        return  result_select_medicine_find_prescription
    } catch (e) {
        console.log(e)
    }
}

const select_medicine_find_category = async () =>{
    let categore_id = ""
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const category_name = require('../route/routes')
        const cursor = MongoDBclient.db('pharmacy').collection('medicine_category')
            .find({ name: category_name.category_name})
        await cursor.forEach(function (doc) {
            categore_id = doc._id
        }, function (err) {
            if (err) throw err;
        });
        const [result_select_medicine_find_category] = await Promise.all([MongoDBclient
            .db('pharmacy')
            .collection('medicine')
            .find({category_id: categore_id})
            .toArray()])
        await MongoDBclient.close()
        return result_select_medicine_find_category
    } catch (e) {
        console.log(e)
    }
}

const add_basket = async () =>{
    try {
        await MongoDBclient.connect()
        console.log("Успешно подключились к базе данных")
        const basket = require('../route/routes')
        let final_amount = 0;
        let amount = 0;
        let category_id = "";
        const neworderbasket = [];
        const objectClientId = new ObjectId(basket.basket.client_id)
        for (let i = 0; i < basket.basket.medicine_id.length; i++) {
            const objectIdString = basket.basket.medicine_id[i];
            const objectMedicineId = new ObjectId(objectIdString);
            const countt = parseInt(basket.basket.count[i]);
            const cursor = MongoDBclient.db('pharmacy').collection('medicine')
                .find({ _id: objectMedicineId})
            await cursor.forEach(function (doc) {
                amount = doc.price * countt;
                category_id = doc.category_id;
                final_amount += amount;
            }, function (err) {
                if (err) throw err;
            });
            neworderbasket.push({medicine_id: objectMedicineId, count: countt, amount: amount,
                category_id: category_id})
        }
        const doc = { client_id: objectClientId,
                                                positions: neworderbasket,
                                                final_amount: final_amount,
                                                status: "корзина",
                                                date: new Date()};
        await MongoDBclient.db('pharmacy').collection('order').insertOne(doc)
        await MongoDBclient.close()
        return "Товар добавлен в корзину"
    } catch (e) {
        console.log(e)
    }
}


module.exports = {select_medicine, select_medicine_find_name, select_medicine_find_manufacture_country,
    select_medicine_find_count_in_package, select_medicine_find_prescription, select_medicine_find_category,
    add_basket};

