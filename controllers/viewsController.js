const loadPage_home = (req, res) => {
    res.render('home');
}
const loadPage_contact = (req, res) => {
    res.render('contact');
}



const offersController = require('./offersController')
const loadPage_offer = async (req, res) => {
    try {
        let offersDb = await offersController.getAllOffers();
        let validOffers = offersController.validateOffersMin_offer(offersDb, 50)

        res.render('offer', {offers: validOffers});
    } catch (err) {
        console.log(err);
    }
}
const loadPage_priceList = async (req, res) => {
    try {
        let offersDb = await offersController.getAllOffers();
        let validOffers = offersController.validateOffersMin_price(offersDb)

        res.render('price-list', {offers: validOffers});
    } catch (err) {
        console.log(err);
    }
}

const opinionsController = require('./opinionsController')
const loadPage_opinions = async (req, res) => {
    try {
        let opinionsDb = await opinionsController.getAllOpinions();
        let validOpinions = opinionsController.validateOpinionsMin(opinionsDb, 125)
        validOpinions = opinionsController.sortOpinions(validOpinions);

        res.render('opinions', {opinions: validOpinions});
    } catch (err) {
        console.log(err);
    }
}



const loadPage_adminPanel_passwordChange = async (req, res) => {
    try {
        let msg = "";

        let withMessage = req.body.loginStatus;
        
        if(withMessage == false) {
            msg = "Podano nieprawidłowe hasło";
        }
        res.render('admin-passwordChange', {msg: msg});
    } catch (err) {
        console.log(err);
    }
}

const loadPage_adminPanel_login = async (req, res) => {
    try {
        let msg = "Błędne hasło";
        let loginStatus = req.body.loginStatus;
        if(loginStatus != false) {
            msg = "";
        }
        
        res.render('admin-login', {msg: msg});
        
    } catch (err) {
        console.log(err);
    }
}
const loadPage_adminPanel = async (req, res) => {
    try {
        let offersDb = await offersController.getAllOffers();
        let validOffers = offersController.validateOffersMin_admin(offersDb, 50)

        let opinionsDb = await opinionsController.getAllOpinions();
        let validOpinions = opinionsController.validateOpinionsMin_admin(opinionsDb, 200)
        validOpinions = opinionsController.sortOpinions(validOpinions);

        res.render('admin-panel', {offers: validOffers, opinions: validOpinions});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    loadPage_home,
    loadPage_contact,

    loadPage_offer,
    loadPage_priceList,
    loadPage_opinions,


    loadPage_adminPanel_passwordChange,
    loadPage_adminPanel_login,
    loadPage_adminPanel
}