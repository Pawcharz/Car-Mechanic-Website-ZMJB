const Offer = require("../models/offer");
const path = require("path");
const fs = require('fs');
const sharp = require('sharp');

const { uploadFile, getFile } = require('./s3Controller');
const sharpStandardSize = 240;


const getOfferById = async (id) => {
    try {
        
        let filter = {
            _id: id,
        }


        let offerDb = await Offer.findOne(filter);

        let resOffer = {
            name: offerDb.name,
            description: offerDb.description,
            price: offerDb.price,
            time: offerDb.time,
            
            img: offerDb.img
        }

        return resOffer;
    }
    catch (err) {
        console.log(err.message);
    }
}
const fetchOfferById = async (req, res) => {
    try {
        
        let filter = {
            _id: req.body.id,
        }


        let offerDb = await Offer.findOne(filter);

        let resOffer = {
            name: offerDb.name,
            description: offerDb.description,
            price: offerDb.price,
            time: offerDb.time,
            
            img: offerDb.img
        }

        return res.send(JSON.stringify(resOffer));
    }
    catch (err) {
        console.log(err.message);
    }
}
const getAllOffers = async () => {
    try {

        let offersDb = await Offer.find();

        return offersDb;
    }
    catch (err) {
        console.log(err.message);
    }
}


const fixDirname = (dirname) => {
    let fixedDirname = dirname.split('\\')
    fixedDirname.pop();
    fixedDirname = fixedDirname.join('\\');
    return fixedDirname;
} 


const createOffer = async (req, res, next) => {
    try {
        const imageKey = (await uploadFile(req.file)).Key;
        const imageBuffer = (await getFile(imageKey)).Body;
        
        let resizedBuffer = await sharp(imageBuffer).resize(null, sharpStandardSize, {}).toBuffer();

        let offerData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            time: req.body.time,

            img: {
                data: resizedBuffer,
                contentType: 'image/png'
            }
        }
        // fs.unlinkSync(imgPath);


        let newOffer = new Offer(offerData);
        await newOffer.save();

    } catch (err) {
        console.log(err);
    }

}
const deleteOffer = async (req, res) => {
    try {
        let filter = {
            _id: req.body.id
        }

        await Offer.deleteOne(filter);

    } catch (err) {
        console.log(err);
    }

}
const updateOffer = async (req, res, next) => {
    try {
        const imageKey = (await uploadFile(req.file)).Key;
        const imageBuffer = (await getFile(imageKey)).Body;
        
        let resizedBuffer = await sharp(imageBuffer).resize(null, sharpStandardSize, {}).toBuffer();


        let reqId = req.body.id;
        let offerDb = await Offer.findOne({_id: reqId});

        offerDb.name = req.body.name;
        offerDb.description = req.body.description;
        offerDb.price = req.body.price;//
        offerDb.time = req.body.time;

        if(req.file) {
            offerDb.img = {
                data: resizedBuffer,
                contentType: 'image/png'
            }
        }
        

        await offerDb.save();
        
    } catch (err) {
        console.log(err);
    }

}



const validateOfferMin_offer = (offerDb, descriptionCharsLimit) => {

    if (offerDb) {

        let validOffer = {
            name: offerDb.name,
            description: offerDb.description,
            price: offerDb.price,
            img: offerDb.img,

            id: offerDb._id
        }

        if (descriptionCharsLimit) {
            validOffer.description = validOffer.description.substring(0, descriptionCharsLimit);
        }

        return validOffer;
    }
    else {
        console.error("offerDb == null");
    }
}
const validateOffersMin_offer = (offersDb, descriptionCharsLimit) => {
    let validOffers = new Array();
    for (let i = 0; i < offersDb.length; i++) {
        let offerDb = offersDb[i];
        let validOffer = validateOfferMin_offer(offerDb, descriptionCharsLimit);
        validOffers.push(validOffer);
    }

    return validOffers;
}

const validateOfferMin_price = (offerDb) => {
    if (offerDb) {

        let validOffer = {
            name: offerDb.name,
            price: offerDb.price,
            time: offerDb.time,
            img: offerDb.img,

            id: offerDb._id
        }

        return validOffer;
    }
    else {
        console.error("offerDb == null");
    }
}
const validateOffersMin_price = (offersDb) => {
    let validOffers = new Array();
    for (let i = 0; i < offersDb.length; i++) {
        let offerDb = offersDb[i];
        let validOffer = validateOfferMin_price(offerDb);
        validOffers.push(validOffer);
    }
    
    return validOffers;
}

const validateOfferMin_admin = (offerDb, descriptionCharsLimit) => {

    if (offerDb) {

        let validOffer = {
            name: offerDb.name,
            description: offerDb.description,
            price: offerDb.price,
            time: offerDb.time,
            img: offerDb.img,
            
            id: offerDb._id
        }

        if (descriptionCharsLimit) {
            validOffer.description = validOffer.description.substring(0, descriptionCharsLimit);
        }

        return validOffer;
    }
    else {
        console.error("offerDb == null");
    }
}
const validateOffersMin_admin = (offersDb, descriptionCharsLimit) => {
    let validOffers = new Array();
    for (let i = 0; i < offersDb.length; i++) {
        let offerDb = offersDb[i];
        let validOffer = validateOfferMin_admin(offerDb, descriptionCharsLimit);
        validOffers.push(validOffer);
    }
    
    return validOffers;
}



module.exports = {
    getOfferById,
    fetchOfferById,
    getAllOffers,

    createOffer,
    deleteOffer,
    updateOffer,

    validateOffersMin_offer,
    validateOffersMin_price,
    validateOffersMin_admin
}