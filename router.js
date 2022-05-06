const express = require('express');
const router = express.Router();


const viewsController = require('./controllers/viewsController');
const offersController = require('./controllers/offersController');
const opinionsController = require('./controllers/opinionsController');
const passwordController = require('./controllers/passwordController');

const emailController = require('./controllers/emailController');


const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
});

let upload = multer({ storage: storage });





router.get('/', viewsController.loadPage_home);

router.get('/offer', viewsController.loadPage_offer)

router.get('/price-list', viewsController.loadPage_priceList)

router.get('/contact', viewsController.loadPage_contact);

router.get('/opinions', viewsController.loadPage_opinions)






let MD5 = require("crypto-js/md5");

let validPassword = "Hasło12345";
let validEncryptedPassword = MD5(validPassword).toString();
let adminPanelAdress = "/" + validEncryptedPassword;

router.get(adminPanelAdress, viewsController.loadPage_adminPanel)

router.get('/adminPanel', (req, res) => {
    res.clearCookie("adminPassword-changeStatus", { httpOnly: true });

    let cookiePassword = req.cookies["adminLogin-password"];

    if(cookiePassword == validEncryptedPassword) {
        res.redirect(adminPanelAdress);
    }
    else {
        req.body.loginStatus = false;
        if(cookiePassword == undefined) {
            req.body.loginStatus = true;
        }
        
        viewsController.loadPage_adminPanel_login(req, res);
    }
    
})
router.post('/adminLogin', async (req, res) => {

    try {
        let password = req.body.password;
        let isPasswordCorrect = await passwordController.verifyPassword(password);

        if(isPasswordCorrect) {
            res.cookie('adminLogin-password', validEncryptedPassword);
            res.redirect(adminPanelAdress);
        }
        else {
            res.cookie('adminLogin-password', false);
            res.redirect('/adminPanel');
        }

    } catch (err) {
        console.log(err);
    }

    
})


router.get('/adminPanel-passwordChange', async (req, res) => {
    res.clearCookie("adminLogin-password", { httpOnly: true });

    
    let cookieChangeStatus = req.cookies["adminPassword-changeStatus"];

    if(cookieChangeStatus == "false" || cookieChangeStatus == false) {
        req.body.loginStatus = false;
    }
    else {
        req.body.loginStatus = true;
    }

    viewsController.loadPage_adminPanel_passwordChange(req, res);
})
router.post('/adminPanel-passwordChange', async (req, res) => {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let isSuccessful = await passwordController.updatePassword(oldPassword, newPassword);

    if(isSuccessful) {
        res.cookie('adminPassword-changeStatus', true);
        res.redirect('/adminPanel');
    }
    else {
        res.cookie('adminPassword-changeStatus', false);
        res.redirect('/adminPanel-passwordChange');
    }
})





router.post('/getOfferById', offersController.getOfferById);
router.post('/fetchOfferById', offersController.fetchOfferById);

router.post('/updateOffer', upload.single('image'), async (req, res, next) => {
    await offersController.updateOffer(req, res, next);
    res.redirect('/adminPanel');
});
router.post('/addOffer', upload.single('image'), async (req, res, next) => {
    await offersController.createOffer(req, res, next);
    res.redirect('/adminPanel');
});
router.post('/deleteOffer', async (req, res) => {
    await offersController.deleteOffer(req, res);
    res.redirect('/adminPanel');
});



router.post('/getOpinionById', async (req, res) => {
    let resOpinion = await opinionsController.getOpinionById(req.body.id);
    res.send(JSON.stringify(resOpinion));
});

router.post('/deleteOpinion', async (req, res) => {
    await opinionsController.deleteOpinion(req, res);
    res.redirect('/adminPanel');
});
router.post('/showOpinion', async (req, res) => {
    await opinionsController.acceptOpinion(req, res);
    res.redirect('/adminPanel');
});
router.post('/hideOpinion', async (req, res) => {
    await opinionsController.dismissOpinion(req, res);
    res.redirect('/adminPanel');
});
router.post('/createOpinion', async (req, res) => {
    await opinionsController.createOpinion(req, res);
    res.redirect('/opinions');
});



router.post('/contactForm', async (req, res) => {

    try {
        let name = req.body.name;
        let phoneNr = req.body.phoneNr;
        let email = req.body.email;
        let message = req.body.message;

        await emailController.sendContactMail(name, phoneNr, email, message);
        res.redirect('contact');

    } catch (err) {
        console.log(err);
    }

    
})


module.exports = router;