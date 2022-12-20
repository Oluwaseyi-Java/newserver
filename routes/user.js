const express = require("express")
const router = express.Router()
const userController = require("../controller/user_controller")

///////////

//get

// router.get("/login", (req, res) => {

//     Fsurvey.find().exec()
//         .then((result) => {
//             res.send(result)
//             console.log(result)
//         })
//         .catch((err) => {
//             res.send(err)
//             console.log(err)
//         })

//     // res.send({ message: "conected" });
//     console.log(req.body)
// })

// router.get("/sign-up", (req, res) => {
//     Fsurvey.find().exec()
//         .then((result) => {
//             res.send(result)
//             console.log(result)
//         })
//         .catch(error => {
//             res.send(error)
//             console.log(error)
//         })
// })

router.get("/:userid/dashboard",userController.get_survey_by_userId_at_dashboard)

router.get("/survey/response/:id", (req, res) => {
    res.send(req.params)
})


router.get("/testing/:surveyId", (req, res) => {

    getSurveysWithpopulate(req.params.surveyId)
        .then(result => {
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
})

router.get("/:userid/surveys", userController.get_surveys_by_userId)

router.get("/create/:userid/:surveyid/:surveyname", (req, res) => {
    res.send("create data")
})

router.get("/response/survey/:name/:surveyid", (req, res) => {
    res.send("response data")
})

//end of get

////

//post
router.post("/sign-up",userController.post_signup_data)

router.post("/login", userController.post_login_data)

router.post("/create/:userid/:surveyid/:surveyname",userController.post_questions_data )

router.post("/response/survey/:name/:surveyid",userController.post_responses_data)

router.post("/createsurvey/:userid",userController.post_newSurvey)

//end of psot

//start of additional middleware

router.put("/create/:userid/:surveyid/:surveyname", (req, res) => {


})


module.exports = router