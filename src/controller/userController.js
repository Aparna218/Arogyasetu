const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const { isValidBody, isValidName, isValidNumber, isValidPass, isValidPin,isValidAdhar,isValidAge,
    isValidObjectId } = require('../validations/validator');

//Registraion of User
exprots.creatUser = async function (req, res) {
    try {
        let data = req.body;
        const { firstName, lastName, phoneNumber, password, adharNo, age, pinCode } = data
        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: `Please provide user details.` })
        if (!firstName) return res.status(400).send({ status: false, message: `firstName is required.` });
        if (!lastName) return res.status(400).send({ status: false, message: `lastName is required.` });
        if (!phoneNumber) return res.status(400).send({ status: false, message: `phoneNumber is required.` });
        if (!adharNo) return res.status(400).send({ status: false, message: `adharNo is required.` });
        if (!password) return res.status(400).send({ status: false, message: `password is required.` });
        if (!age) return res.status(400).send({ status: false, message: `age is required.` });
        if (!pinCode) return res.status(400).send({ status: false, message: `pinCode is required.` });

        if (!isValidName(firstName)) return res.status(400).send({ status: false, message: ` '${firstName}' this firstName is not valid.` });
        if (!isValidName(lastName)) return res.status(400).send({ status: false, message: ` '${lastName}' this lastName is not valid.` });
        if (!isValidNumber(phoneNumber)) return res.status(400).send({ status: false, message: ` '${phoneNumber}' this phoneNumber is not valid phoneNumber.` });
        if (!isValidAdhar(adharNo)) return res.status(400).send({ status: false, message: ` '${adharNo}' this is not valid indian adharNo number.` });
        if (!isValidPass(password)) return res.status(400).send({ status: false, message: `Use this combination 8-15 char & use 0-9,A-Z,a-z & special char.` });
        if (!isValidAge(age)) return res.status(400).send({ status: false, message: ` '${age}' this age is not valid.` });
        if (!isValidPin(pinCode)) return res.status(400).send({ status: false, message: ` '${pinCode}' this pinCode is not valid.` });
        
        //checking duplicate mobileno
        const duplicatePhone = await userModel.findOne({ phoneNumber });
        if (duplicatePhone) return res.status(400).send({ status: false, message: `Phone no already exits.` });

        //password hashing
        reqBody['password'] = await bcrypt.hash(password, 10);

        const savdData = await userModel.create(data);
        return res.status(201).send({ status: true, message: "User Created Succesfully", data: savdData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//User login
exprots.login = async function (req, res) {
    try {
        let data = req.body;
        const { phoneNumber, password } = data;
        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: `Please fill the data.` })
        if (!phoneNumber) return res.status(400).send({ status: false, message: `phoneNumber is required.` });
        if (!password) return res.status(400).send({ status: false, message: `Password is required.` });

        if (!isValidNumber(phoneNumber)) return res.status(400).send({ status: false, message: ` '${phoneNumber}' this phoneNumber is not valid.` });
        if (!isValidPass(password)) return res.status(400).send({ status: false, message: `Password should be 8-15 char & use 0-9,A-Z,a-z & special char this combination.` });

        //existUser
        const existUser = await userModel.findOne({ phoneNumber });
        if (!existUser) return res.status(404).send({ status: false, message: 'Please register first.' });

        //decoding hash password
        const matchPass = await bcrypt.compare(password, existUser.password);
        if (!matchPass) return res.status(401).send({ status: false, message: 'Wrong password.' })

        return res.status(200).send({ status: true, message: 'Login Successful.', data: existUser });


    } catch (error) {
        return res.status(500).send({ status: 500, message: error.message })
    }
}