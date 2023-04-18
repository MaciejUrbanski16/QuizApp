import { useState } from "react";
import Select from 'react-select'
import RankingButton from "./RankingButton";
import LogoutButton from "./LogoutButton";
import SubmitFinalResultButton from "./SubmitFinalResultButton";

import axios from './api/axios'

import './Page.css'

const Page = ({login}) => {

    const dbGeographyUrl = 'api/db/geography'
    const dbHistoryUrl = 'api/db/history'

    console.log("login in Page", login);

    const options = [
        { value: 'geografia', label: 'Geografia' },
        { value: 'fizyka', label: 'Fizyka' },
        { value: 'matematyka', label: 'Matematyka' }
    ];

    //hardcoded to five questions
    let counterOfQuestions = 0;
    let submittedAnswers = [
        {
            question: "none",
            correctAnswer: "none",
            answerA: "none",
            answerB: "none",
            answerC: "none",
            answerD: "none",
        },
        {
            question: "none",
            correctAnswer: "none",
            answerA: "none",
            answerB: "none",
            answerC: "none",
            answerD: "none",
        },
        {
            question: "none",
            correctAnswer: "none",
            answerA: "none",
            answerB: "none",
            answerC: "none",
            answerD: "none",
        },
        {
            question: "none",
            correctAnswer: "none",
            answerA: "none",
            answerB: "none",
            answerC: "none",
            answerD: "none",
        },
        {
            question: "none",
            correctAnswer: "none",
            answerA: "none",
            answerB: "none",
            answerC: "none",
            answerD: "none",
        }

    ]

    const [selectedCategory, setSelectedCategory] = useState(' ');

    const [id, setId] = useState(0);
    const [question, setQuestion] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const [questionNumber, setQuestionNumber] = useState(1);
    const [collectedPoints, setCollectedPoints] = useState(0);

    const [questionsArray, setQuestionsArray] = useState([]);

    //const [counterOfQuestions, setCounterOfQuestions]



    const handleSubmit = async e => {
        //e.preventDefault();
        console.log("Handle submit");

        try {
            const response = await axios.get(dbGeographyUrl, JSON.stringify({
                id,
                question,
                answerA,
                answerB,
                answerC,
                answerD,
                correctAnswer
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )
            



            console.log(response.data)

            console.log(JSON.stringify(response))


        } catch (error) {
            if (!error?.response) {
                console.log('No internet connection')
            }
            // else if (error.response?.status === 409) {
            //     console.log('User name taken')
            // }
            // else {
            //     console.log('Registration failed')
            // }

            //errRef.current.focus()
        }


    }

    const handleNextQuestion = async () => {
        console.log("Next slajd plis " + selectedCategory.value);
        setQuestionNumber(questionNumber + 1);

        if (selectedCategory.value === 'geografia') {
            try {
                const response = await axios.get(dbGeographyUrl, JSON.stringify({
                    id,
                    question,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    correctAnswer
                }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
               
                setId(response.data.question.id);
                setQuestion(response.data.question.question);
                setAnswerA(response.data.question.answerA);
                setAnswerB(response.data.question.answerB);
                setAnswerC(response.data.question.answerC);
                setAnswerD(response.data.question.answerD);
                setCorrectAnswer(response.data.question.correctAnswer);
                //submittedAnswers.push(response);
                // submittedAnswers.push({
                //     "question": response.data.question.question,
                //     "correctAnswer": response.data.question.correctAnswer,
                //     "answerA": response.data.question.answerA,
                //     "answerB": response.data.question.answerB,
                //     "answerC": response.data.question.answerC,
                //     "answerD": response.data.question.answerD
                // });
                submittedAnswers[questionNumber].question = question;
                submittedAnswers[questionNumber].correctAnswer = correctAnswer;
                submittedAnswers[questionNumber].answerA = answerA;
                submittedAnswers[questionNumber].answerA = answerB;
                submittedAnswers[questionNumber].answerA = answerC;
                submittedAnswers[questionNumber].answerA = answerD;
                //counterOfQuestio;

                //setFirstQuestion(response);
                //questionsArray.push(response);
                //setQuestionsArray(questionsArray);
                setQuestionsArray([...questionsArray, {
                    "question": response.data.question.question,
                    "answerA": response.data.question.answerA,
                    "answerB": response.data.question.answerB,
                    "answerC": response.data.question.answerC,
                    "answerD": response.data.question.answerD,
                    "correctAnswer": response.data.question.correctAnswer
                }]);
                console.log("Table size: ", questionsArray.length, "questions array length: ", questionsArray.length
                , "submitted: ", JSON.stringify(questionsArray));

                

                console.log(response.data.question.question)

                console.log(JSON.stringify(response))


            } catch (error) {
                if (!error?.response) {
                    console.log('No internet connection')
                }
                // else if (error.response?.status === 409) {
                //     console.log('User name taken')
                // }
                // else {
                //     console.log('Registration failed')
                // }

                //errRef.current.focus()
            }
        }
    }

    const handleSelectCategory = async (selectedOption) => {

        setSelectedCategory(selectedOption);
        console.log(`Option selected:`, selectedOption);

        if (selectedOption.value === 'geografia') {
            try {
                const response = await axios.get(dbGeographyUrl, JSON.stringify({
                    id,
                    question,
                    answerA,
                    answerB,
                    answerC,
                    answerD,
                    correctAnswer
                }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                    
                setId(response.data.question.id);
                setQuestion(response.data.question.question);
                setAnswerA(response.data.question.answerA);
                setAnswerB(response.data.question.answerB);
                setAnswerC(response.data.question.answerC);
                setAnswerD(response.data.question.answerD);
                setCorrectAnswer(response.data.question.correctAnswer);
                // submittedAnswers.push({
                //     "question": response.data.question.question,
                //     "correctAnswer": response.data.question.correctAnswer,
                //     "answerA": response.data.question.answerA,
                //     "answerB": response.data.question.answerB,
                //     "answerC": response.data.question.answerC,
                //     "answerD": response.data.question.answerD
                // })
                setQuestionsArray([...questionsArray, {
                    "question": response.data.question.question,
                    "answerA": response.data.question.answerA,
                    "answerB": response.data.question.answerB,
                    "answerC": response.data.question.answerC,
                    "answerD": response.data.question.answerD,
                    "correctAnswer": response.data.question.correctAnswer
                }]);
                console.log("Table size: ", submittedAnswers.length);
                console.log(response.data.question.question)

                console.log(JSON.stringify(response))


            } catch (error) {
                if (!error?.response) {
                    console.log('No internet connection')
                }
                // else if (error.response?.status === 409) {
                //     console.log('User name taken')
                // }
                // else {
                //     console.log('Registration failed')
                // }

                //errRef.current.focus()
            }
        }
    }

    function setSelectedCategoryAsNone() {
        handleSelectCategory();
    }

    function handleUserAnswer(answer) {
        console.log("handle user answer: " + answer);
        if (answer === correctAnswer) {
            setCollectedPoints(collectedPoints + 1)
        }
    }


    return (
        <div>
            {
                questionNumber !== 6 ? (
                    selectedCategory.value === 'geografia' ? (

                        <div className="questionAndAnswers" onChange={(e) => handleUserAnswer(e.target.value)}>

                            {question} <br />
                            <input className="answerButton" type="radio" value={answerA} name="answer" /> {answerA} <br />
                            <input className="answerButton" type="radio" value={answerB} name="answer" /> {answerB} <br />
                            <input className="answerButton" type="radio" value={answerC} name="answer" /> {answerC} <br />
                            <input className="answerButton" type="radio" value={answerD} name="answer" /> {answerD} <br />

                            Czy chcesz poznać prawidłową odpowiedź ?? <br />
                            <button className="nextQuestion" onClick={handleNextQuestion}>Submit answer</button>

                        </div>
                    ) :
                        (
                            <div>
                                <LogoutButton />
                                <RankingButton />

                                <form className="categoryChoiceForm" >

                                    <label >
                                        Jesli chcesz wziac udzial w quizie wybierz kategorie sposrod dostepnych<br /><br /><br />
                                        
                                        <Select options={options} onChange={handleSelectCategory} autoFocus={true} /><br /><br /><br />
                                    </label>
                                    <input className="submitChooseCategory" type="submit" value="Wybierz kategorie" /><br />


                                    <br />
                                </form>
                            </div>
                        )

                ) : 
                    (<div className="finalResults">
                        Final results {collectedPoints} <br />
                        Your answers were:<br />

                        Question: {questionsArray[0].question} <br />
                        A: {questionsArray[0].answerA} <br />
                        B: {questionsArray[0].answerB} <br />
                        C: {questionsArray[0].answerC} <br />
                        D: {questionsArray[0].answerD} <br />
                        Correct answer: {questionsArray[0].correctAnswer}<br />

                        Question: {questionsArray[1].question} <br />
                        A: {questionsArray[1].answerA} <br />
                        B: {questionsArray[1].answerB} <br />
                        C: {questionsArray[1].answerC} <br />
                        D: {questionsArray[1].answerD} <br />
                        Correct answer: {questionsArray[1].correctAnswer}<br />

                        Question: {questionsArray[2].question} <br />
                        A: {questionsArray[2].answerA} <br />
                        B: {questionsArray[2].answerB} <br />
                        C: {questionsArray[2].answerC} <br />
                        D: {questionsArray[2].answerD} <br />
                        Correct answer: {questionsArray[2].correctAnswer}<br />

                        Question: {questionsArray[3].question} <br />
                        A: {questionsArray[3].answerA} <br />
                        B: {questionsArray[3].answerB} <br />
                        C: {questionsArray[3].answerC} <br />
                        D: {questionsArray[3].answerD} <br />
                        Correct answer: {questionsArray[3].correctAnswer}<br />

                        Question: {questionsArray[4].question} <br />
                        A: {questionsArray[4].answerA} <br />
                        B: {questionsArray[4].answerB} <br />
                        C: {questionsArray[4].answerC} <br />
                        D: {questionsArray[4].answerD} <br />
                        Correct answer: {questionsArray[4].correctAnswer}<br />
                        <SubmitFinalResultButton login={login} correctAnswers={collectedPoints} time={'0:12'} totalQuestions={5}/>

                    </div>)
            }



        </div>


    )
}

export default Page;


