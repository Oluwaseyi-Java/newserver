const mongoose = require("mongoose")


const {
    Response, Question, Survey, Surveys, Fsurvey
} = require("../models/Survey")

/////////
const setFSurvey = async (fsurvey) => {
    const docFSurvey = await Fsurvey.create(fsurvey)
    console.log("FSurvey created")
    return docFSurvey
}

// const setSurveys = async (fsurveyId, surveys) => {
//     const docSurveys = await Surveys.create()
//     console.log("Surveys created")
//     return FSurvey.findByIdAndUpdate(
//         fsurveyId,
//         {
//             $push: {
//                 surveyData: {
//                     _id: docSurveys._id,
//                 }
//             }
//         },
//         {
//             new: true, useFindAndModify: false
//         }
//     )
// }

const setSurvey = async (fsurveyId, survey) => {
    const docSurvey = await Survey.create(survey)
    console.log("Survey created")
    return await Fsurvey.findByIdAndUpdate(
        fsurveyId,
        {
            $push: {
                surveyData: docSurvey
            }
        },
        { new: true, useFindAndModify: false }
    )
}

const setQuestion = async (surveyId, question) => {
    const docQuestion = await Question.create(question)
    console.log("Question created")
    return await Survey.findByIdAndUpdate(
        surveyId,
        {
            $push: {
                questions: docQuestion
            }
        },
        { new: true, useFindAndModify: false }
    )
}

const setResponse = async (surveyId, response) => {
    const docResponse = await Response.create(response)
    console.log("Response created")
    return await Survey.findByIdAndUpdate(
        surveyId,
        {
            $psuh: {
                responses: docResponse
            }
        },
        { new: true, useFindAndModify: false }
    )
}

const getSurveysWithpopulate = async (id) => {
    return Fsurvey.findById(id).populate("surveyData")
}

module.exports.get_survey_by_userId_at_dashboard = (req, res) => {
    Fsurvey.find().exec()
        .then(result => {
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
}

module.exports.get_surveys_by_userId = (req, res) => {
    Survey.find().exec()
        .then(result => {
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
}

module.exports.post_signup_data = (req, res) => {
    console.log(req.body)

    setFSurvey({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        phoneNo: req.body.phoneNumber,
        password: req.body.password
    })
        .then(result => {
            // setSurveys(result._id, {
            //     _id: mongoose.Types.ObjectId()
            // })
            //     .then(result => {
            //         console.log(result)

            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
}

module.exports.post_login_data = (req, res) => {

    const details = { "email": req.body.email }
    Fsurvey.findOne(details, (err, item) => {
        if (err) {
            res.send({ "error": err, "message": "An error has occurred, please check your internet connection." })
            console.log(err)
        }
        else if (!item) {
            res.send({ "message": "This account does not exist, try signing in." })
        }
        else {
            if (item.email === req.body.email && item.password === req.body.password) {
                res.status(201).send({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    phoneNo: item.phoneNo,
                    userName: item.userName

                })

                console.log(item)
            }
            else {
                res.send({ "message": "Please check your password" })
            }
        }
    })
}

module.exports.post_questions_data = (req, res) => {
    console.log(req.body);

    setQuestion(req.params.surveyid, {
        _id: mongoose.Types.ObjectId(),
        headTitle: req.body.headTitle,
        inputType: req.body.inputType,
        type: req.body.type,
        isOption: req.body.isOption,
        options: req.body.options,
        isRequired: req.body.isRequired
    })
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })

}

module.exports.post_responses_data = (req, res) => {
    console.log(req.body);

    setResponse(req.params.surveyid, {
        _id: mongoose.Types.ObjectId(),
        response: req.body.response
    })
        .then(result => {
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })

}

module.exports.post_newSurvey = (req, res) => {

    console.log(req.body)

    setSurvey(req.params.userid, {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title
    })
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
}