const mongoose = require('mongoose');
const Schema = mongoose.Schema



const Response = mongoose.model("Response", new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    response: {
        type: String,
        default: ""
    }
}))

const Question = mongoose.model("Question", new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    headTitle: {
        type: String,
        default: ""
    },
    inputType: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isOption: {
        type: Boolean,
        default: false
    },
    options: [String],
    isRequired: {
        type: Boolean,
        default: false
    }

}))


const Survey = mongoose.model("Survey", new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    responses: [[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Response"
        }
    ]]
}, {
    timestamps: true
}
))

// const Surveys = mongoose.model("Surveys", new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     surveys: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Survey"
//         }
//     ]
// }))

const Fsurvey = mongoose.model("Fsurvey", new Schema({
    name: String,
    email: String,
    userName: String,
    _id: mongoose.Schema.Types.ObjectId,
    phoneNo: String,
    password: String,
    surveyData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey"
        }
    ]

}))

module.exports = {
    Response, Question, Survey, /*Surveys,*/ Fsurvey
}