var  express = require('express');
var router = express.Router();


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// const ensureLoggedIn = require('../ensureLoggedIn');


router.get('/', async function (req,res) {
    const username = process.env.SEED_USER_NAME

    const dbuser = await prisma.user.findUnique({
        where:{
            username:username
        },
        include:{
            workoutLogs: true,
        }
    })

    res.render('dashboard',{
        title: "The Workout Tracker - Dashboard",
        // isAuthenticated: req.isAuthenticated(),
        user: dbuser
    })
})

module.exports = router;