const Opinion = require("../models/opinion");
const path = require("path");


const sortOpinions = (opinions) => {
    let visibleOpinions = new Array();
    let hiddenOpinions = new Array();

    for(let i = 0; i < opinions.length; i++) {
        let opinion = opinions[i];

        if(opinion.accepted == true) {
            visibleOpinions.push(opinion);
        }
        else {
            hiddenOpinions.push(opinion);
        }
    }

    let sortedVisibleOpinions = new Array();
    for(let i = 5; i > 0; i--) {
        for(let j = 0; j < visibleOpinions.length; j++) {
            let opinion = visibleOpinions[j];
            if(opinion.rating == i) {
                sortedVisibleOpinions.push(opinion);
            }
        }
    }


    let sortedHiddenOpinions = new Array();
    for(let i = 5; i > 0; i--) {
        for(let j = 0; j < hiddenOpinions.length; j++) {
            let opinion = hiddenOpinions[j];
            if(opinion.rating == i) {
                sortedHiddenOpinions.push(opinion);
            }
        }
    }

    return sortedHiddenOpinions.concat(sortedVisibleOpinions);
}


const getOpinionById = async (id) => {
    try {

        let filter = {
            _id: id,
        }
        //console.log("filter: ", filter)
        let opinionDb = await Opinion.findOne(filter);

        return opinionDb;
    }
    catch (err) {
        console.log(err.message);
    }
}
const getAllOpinions = async () => {
    try {

        let opinionsDb = await Opinion.find();
        return opinionsDb;
    }
    catch (err) {
        console.log(err.message);
    }
}

const createOpinion = async (req, res) => {
    try {
        let opinionData = {
            name: req.body.name,
            content: req.body.content,
            rating: req.body.rating,
            accepted: false
        }

        let newOpinion = new Opinion(opinionData);
        let newOpinionDb = await newOpinion.save();
    } catch (err) {
        console.log(err);
    }
}
const deleteOpinion = async (req, res) => {
    try {
        let filter = {
            _id: req.body.id
        }

        await Opinion.deleteOne(filter);

    } catch (err) {
        console.log(err);
    }

}

const acceptOpinion = async (req, res) => {
    try {
        let id = req.body.id;
        
        let opinionDb = await getOpinionById(id);
        opinionDb.accepted = true;
        await opinionDb.save();


    } catch (err) {
        console.log(err);
    }
}
const dismissOpinion = async (req, res) => {
    try {
        let id = req.body.id;
        
        let opinionDb = await getOpinionById(id);
        opinionDb.accepted = false;
        await opinionDb.save();


    } catch (err) {
        console.log(err);
    }
}

const validateOpinionMin = (opinionDb, contentCharsLimit) => {

    if (opinionDb && opinionDb.accepted == true) {

        let validOpinion = {
            name: opinionDb.name,
            content: opinionDb.content,
            rating: opinionDb.rating,

            id: opinionDb._id
        }

        if (contentCharsLimit) {
            validOpinion.content = validOpinion.content.substring(0, contentCharsLimit);
        }

        return validOpinion;
    }
    else {
        //console.error("opinionDb == null");
    }
}
const validateOpinionsMin = (opinionsDb, contentCharsLimit) => {
    let validOpinions = new Array();
    for (let i = 0; i < opinionsDb.length; i++) {
        let opinionDb = opinionsDb[i];
        
        let validOpinion = validateOpinionMin(opinionDb, contentCharsLimit);
        if(validOpinion)
            validOpinions.push(validOpinion);
    }
    return validOpinions;
}

const validateOpinionMin_admin = (opinionDb, contentCharsLimit) => {

    if (opinionDb) {

        let validOpinion = {
            name: opinionDb.name,
            content: opinionDb.content,
            rating: opinionDb.rating,

            accepted: opinionDb.accepted,
            id: opinionDb._id
        }

        if (contentCharsLimit) {
            validOpinion.content = validOpinion.content.substring(0, contentCharsLimit);
        }

        return validOpinion;
    }
    else {
        console.error("opinionDb == null");
    }
}
const validateOpinionsMin_admin = (opinionsDb, contentCharsLimit) => {
    let validOpinions = new Array();
    for (let i = 0; i < opinionsDb.length; i++) {
        let opinionDb = opinionsDb[i];
        let validOpinion = validateOpinionMin_admin(opinionDb, contentCharsLimit);
        validOpinions.push(validOpinion);
    }
    return validOpinions;
}


module.exports = {
    sortOpinions,

    getOpinionById,
    getAllOpinions,
    
    createOpinion,
    deleteOpinion,

    acceptOpinion,
    dismissOpinion,
    
    validateOpinionsMin,
    validateOpinionsMin_admin
}
