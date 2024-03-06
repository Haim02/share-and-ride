const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Message = require('./models/message')
const Product = require('./models/product')
const User = require('./models/user');
dotenv.config({ path: './config.env' })
const {mongoConnect} = require('./utils/mongoConnect');

// DELETE ALL DATA FROM DB
const deletData = async () => {
    await mongoConnect()
    try {
        await Message.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        7('Data successfull deleted');
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importDate();
} else if(process.argv[2] === '--delete') { 
    deletData();
}
