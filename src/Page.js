import { useState, useEffect } from "react";
import Select, { components } from 'react-select'

import RankingButton from "./RankingButton";
import LogoutButton from "./LogoutButton";
import SubmitFinalResultButton from "./SubmitFinalResultButton";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import axios from './api/axios'

import './Page.css'



const Page = ({ login, setRankingPage, setRankingArray, rankingArray, data }) => {

    const dbGeographyUrl = 'api/db/geography'
    const dbMathUrl = 'api/db/math'
    const dbPhysicsUrl = 'api/db/physics'

    console.log("login in Page", login);
    console.log("Ranking data: " + data);

    const [counter, setCounter] = useState(30);
    const [isActive, setIsActive] = useState(true);

    const [totalTimeOfAnserwing, setTotalTimeOfAnswering] = useState(0);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setCounter(0);
        setIsActive(false);
    };

    useEffect(() => {
        if (isActive) {
            const timer =
                counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            return () => clearInterval(timer);
        } else if (!isActive && counter !== 0) {
            clearInterval(counter);
        }
    }, [counter, isActive]);


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
    const [isSubmitSelectCategory, setIsSubmitSelectCategory] = useState(false)

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
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerToCurrentQuestion, setAnswerToCurrentQuestion] = useState(' ')

    const handleNextQuestion = async () => {

        setQuestionNumber(questionNumber + 1);
        console.log("Next slajd plis " + selectedCategory.value + " question number: " + questionNumber + " counter: " + counter);
        setTotalTimeOfAnswering(totalTimeOfAnserwing + (30 - counter));
        reset();
        setCounter(30);
        setIsActive(true);

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

                submittedAnswers[questionNumber].question = question;
                submittedAnswers[questionNumber].correctAnswer = correctAnswer;
                submittedAnswers[questionNumber].answerA = answerA;
                submittedAnswers[questionNumber].answerA = answerB;
                submittedAnswers[questionNumber].answerA = answerC;
                submittedAnswers[questionNumber].answerA = answerD;

                setQuestionsArray([...questionsArray, {
                    "question": response.data.question.question,
                    "answerA": response.data.question.answerA,
                    "answerB": response.data.question.answerB,
                    "answerC": response.data.question.answerC,
                    "answerD": response.data.question.answerD,
                    "correctAnswer": response.data.question.correctAnswer
                }]);
                //console.log("Table size: ", questionsArray.length, "questions array length: ", questionsArray.length
                //    , "submitted: ", JSON.stringify(questionsArray));



                console.log(response.data.question.question)

                console.log(JSON.stringify(response))
                console.log("Question walidation")

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer[0]);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        userAnswer: answerToCurrentQuestion,
                        isCorrectAnswer: true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer[0]);
                    setUserAnswers([...userAnswers, {
                        userAnswer: answerToCurrentQuestion,
                        isCorrectAnswer: false
                    }])
                }
                console.log("Answer to current question: " + answerToCurrentQuestion + " correctAnswer: " + correctAnswer[0])
                setAnswerToCurrentQuestion(' ');
                console.log("Points: " + collectedPoints + " size of userAnswers: " + userAnswers.length);



            } catch (error) {
                if (!error?.response) {
                    console.log('No internet connection')
                }
                else if (error.response?.status === 409) {
                    console.log('User name taken')
                }
                else {
                    console.log('Registration failed')
                }
            }
        }
        else if (selectedCategory.value === 'matematyka') {
            try {
                const response = await axios.get(dbMathUrl, JSON.stringify({
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

                submittedAnswers[questionNumber].question = question;
                submittedAnswers[questionNumber].correctAnswer = correctAnswer;
                submittedAnswers[questionNumber].answerA = answerA;
                submittedAnswers[questionNumber].answerA = answerB;
                submittedAnswers[questionNumber].answerA = answerC;
                submittedAnswers[questionNumber].answerA = answerD;

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
                console.log("Question walidation")

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": false
                    }])
                }
                console.log("Answer to current question: " + answerToCurrentQuestion + " correctAnswer: " + correctAnswer)
                setAnswerToCurrentQuestion(' ');
                console.log("Points: " + collectedPoints + " size of userAnswers: " + userAnswers.length);



            } catch (error) {
                if (!error?.response) {
                    console.log('No internet connection')
                }
                else if (error.response?.status === 409) {
                    console.log('User name taken')
                }
                else {
                    console.log('Registration failed')
                }
            }
        }
        else if (selectedCategory.value === 'fizyka') {
            try {
                const response = await axios.get(dbPhysicsUrl, JSON.stringify({
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

                submittedAnswers[questionNumber].question = question;
                submittedAnswers[questionNumber].correctAnswer = correctAnswer;
                submittedAnswers[questionNumber].answerA = answerA;
                submittedAnswers[questionNumber].answerA = answerB;
                submittedAnswers[questionNumber].answerA = answerC;
                submittedAnswers[questionNumber].answerA = answerD;

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
                console.log("Question walidation")

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": false
                    }])
                }
                console.log("Answer to current question: " + answerToCurrentQuestion + " correctAnswer: " + correctAnswer)
                setAnswerToCurrentQuestion(' ');
                console.log("Points: " + collectedPoints + " size of userAnswers: " + userAnswers.length);



            } catch (error) {
                if (!error?.response) {
                    console.log('No internet connection')
                }
                else if (error.response?.status === 409) {
                    console.log('User name taken')
                }
                else {
                    console.log('Registration failed')
                }
            }
        }
        else {
            console.log("Unsupported selected category!!!");
        }
    }

    const handleSubmitSelectCategory = async () => {
        
        setIsSubmitSelectCategory(true);

        //setTotalTimeOfAnswering(totalTimeOfAnserwing + (30 - counter));
        reset();
        setCounter(30);
        setIsActive(true);

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
                //console.log(response.data.question.question)

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer[0]);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        userAnswer: answerToCurrentQuestion,
                        isCorrectAnswer: true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer[0]);
                    setUserAnswers([...userAnswers, {
                        userAnswer: answerToCurrentQuestion,
                        isCorrectAnswer: false
                    }])
                }
                console.log("Answer to current question: " + answerToCurrentQuestion + " correctAnswer: " + correctAnswer[0])
                console.log("Points: " + collectedPoints + " size of userAnswers: " + userAnswers.length);


                //console.log(JSON.stringify(response))


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
        else if (selectedCategory.value === 'fizyka') {
            try {
                const response = await axios.get(dbPhysicsUrl, JSON.stringify({
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

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": false
                    }])
                }


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
        else if (selectedCategory.value === 'matematyka') {
            try {
                const response = await axios.get(dbMathUrl, JSON.stringify({
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

                if (answerToCurrentQuestion === correctAnswer[0]) {
                    console.log("Correct answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setCollectedPoints(collectedPoints + 1)
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": true
                    }])
                }
                else {
                    console.log("Wrong answer " + answerToCurrentQuestion + " " + correctAnswer);
                    setUserAnswers([...userAnswers, {
                        "userAnswer": answerToCurrentQuestion,
                        "isCorrectAnswer": false
                    }])
                }


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
        console.log("Option selected: ", selectedOption.value);
        setSelectedCategory(selectedOption);
    }


    function handleUserAnswer(answer) {
        console.log("handle user answer: " + answer);
        console.log("All users answers: " + userAnswers);
        setAnswerToCurrentQuestion(answer);

    }

    const options = [
        { value: 'geografia', label: 'Geografia', color: '#abcfca' },
        { value: 'fizyka', label: 'Fizyka', color: '#abcfcf' },
        { value: 'matematyka', label: 'Matematyka', color: '#abcfcf', fontColor: '#00ff00' }
    ];


    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "white",
            backgroundColor: state.data.color,
            fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
            fontSize: state.selectProps.myFontSize
        })
    };

    const separatorStyle = {
        border: "none",
        height: "11px",
        color: "#1c11cc",
        backgroundColor: "#ccddcc",
        marginTop: "20px",
        marginBottom: "20px"
    }






    return (
        <div>
            {
                questionNumber !== 6 ? (
                    (selectedCategory.value === 'geografia' || selectedCategory.value === 'fizyka' || selectedCategory.value === 'matematyka')
                        && isSubmitSelectCategory === true ? (
                        <p>

                            Pytanie numer {questionNumber}<br />
                            Pozostały czas na udzielenie odpowiedzi
                            <div id="pomodoro-timer">
                                {" "}
                                <CountdownCircleTimer
                                    onComplete={() => {
                                        console.log("Timer expired");
                                        handleNextQuestion();
                                        //setTotalTimeOfAnswering(totalTimeOfAnserwing + 30);
                                        setCounter(30);
                                        setIsActive(true);
                                        return [true]; // repeat animation in 1.5 seconds
                                    }}
                                    isPlaying
                                    duration={counter}
                                    colors="#E5007B"
                                >
                                    
                                </CountdownCircleTimer>
                            </div>
                            <div>{counter}</div>
                            <div className="questionAndAnswers" onChange={(e) => handleUserAnswer(e.target.value)}>


                                <div className="radio-group">
                                    <label className="question">

                                        {question} <br /><br />

                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="A" className="radio-input" />
                                        <span className="radio-label">{"A  " + answerA}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="B" className="radio-input" />
                                        <span className="radio-label">{"B  " + answerB}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="C" className="radio-input" />
                                        <span className="radio-label">{"C  " + answerC}</span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="answer" value="D" className="radio-input" />
                                        <span className="radio-label">{"D  " + answerD}</span>
                                    </label>
                                </div>


                                <button className="nextQuestion" onClick={handleNextQuestion}>Submit answer</button>
                            </div>

                        </p>

                    ) :
                        (
                            <div>
                                <div className="twoButtons">
                                <LogoutButton />
                                <RankingButton setRankingPage={setRankingPage} setRankingArray={setRankingArray} rankingArray={rankingArray} />
                                </div>
                                <form className="categoryChoiceForm" onSubmit={handleSubmitSelectCategory} >

                                    <div >
                                        <div className="fontForMsg">
                                            Jeśli chcesz wziąć udział w quizie wybierz dziedzinę spośród dostępnych<br /><br /><br />
                                        </div>

                                        <Select options={options} onChange={handleSelectCategory} autoFocus={true} menuColor='red' styles={styles} width='670px'



                                        /><br /><br /><br />

                                        <input className="submitChooseCategory" type="submit" value="Wybierz kategorie" /><br />
                                    </div>



                                    <br />
                                </form>
                            </div>
                        )

                ) :
                    (<div className="finalResults">
                        Uzyskano punktów: {collectedPoints} w czasie {totalTimeOfAnserwing}s<br /><br />
                        Twoje odpowiedzi na pytania były następujące:<br /><br />

                        Pytanie 1: {questionsArray[0].question} <br />
                        A: {questionsArray[0].answerA} <br />
                        B: {questionsArray[0].answerB} <br />
                        C: {questionsArray[0].answerC} <br />
                        D: {questionsArray[0].answerD} <br /><br />
                        {userAnswers[0].isCorrectAnswer === true ? (<div>
                            <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[0].userAnswer}<br />
                                Poprawna odpowiedź: {questionsArray[0].correctAnswer}</div><br />
                        </div>
                        ) :
                            (
                                <div>
                                    <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[0].userAnswer}<br />
                                        Poprawna odpowiedź: {questionsArray[0].correctAnswer}</div><br />
                                </div>
                            )}

                        <hr
                            style={separatorStyle}
                        />
                        Pytanie 2: {questionsArray[1].question} <br />
                        A: {questionsArray[1].answerA} <br />
                        B: {questionsArray[1].answerB} <br />
                        C: {questionsArray[1].answerC} <br />
                        D: {questionsArray[1].answerD} <br /><br />
                        {userAnswers[1].isCorrectAnswer === true ? (<div>
                            <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[1].userAnswer}<br />
                                Poprawna odpowiedź: {questionsArray[1].correctAnswer}</div><br />
                        </div>
                        ) :
                            (
                                <div>
                                    <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[1].userAnswer}<br />
                                        Poprawna odpowiedź: {questionsArray[1].correctAnswer}</div><br />
                                </div>
                            )}
                        <hr
                            style={separatorStyle}
                        />
                        Pytanie 3: {questionsArray[2].question} <br />
                        A: {questionsArray[2].answerA} <br />
                        B: {questionsArray[2].answerB} <br />
                        C: {questionsArray[2].answerC} <br />
                        D: {questionsArray[2].answerD} <br /><br />
                        {userAnswers[2].isCorrectAnswer === true ? (<div>
                            <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[2].userAnswer}<br />
                                Poprawna odpowiedź: {questionsArray[2].correctAnswer}</div><br />
                        </div>
                        ) :
                            (
                                <div>
                                    <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[2].userAnswer}<br />
                                        Poprawna odpowiedź: {questionsArray[2].correctAnswer}</div><br />
                                </div>
                            )}
                        <hr
                            style={separatorStyle}
                        />
                        Pytanie 4: {questionsArray[3].question} <br />
                        A: {questionsArray[3].answerA} <br />
                        B: {questionsArray[3].answerB} <br />
                        C: {questionsArray[3].answerC} <br />
                        D: {questionsArray[3].answerD} <br /> <br />
                        {userAnswers[3].isCorrectAnswer === true ? (<div>
                            <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[3].userAnswer}<br />
                                Poprawna odpowiedź: {questionsArray[3].correctAnswer}</div><br />
                        </div>
                        ) :
                            (
                                <div>
                                    <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[3].userAnswer}<br />
                                        Poprawna odpowiedź: {questionsArray[3].correctAnswer}</div><br />
                                </div>
                            )}
                        <hr
                            style={separatorStyle}
                        />



                        Pytanie 5: {questionsArray[4].question} <br />
                        A: {questionsArray[4].answerA} <br />
                        B: {questionsArray[4].answerB} <br />
                        C: {questionsArray[4].answerC} <br />
                        D: {questionsArray[4].answerD} <br /> <br />
                        {userAnswers[4].isCorrectAnswer === true ? (<div>
                            <div className="correctAnswerSummary">Twoja odpowiedź: {userAnswers[4].userAnswer}<br />
                                Poprawna odpowiedź: {questionsArray[4].correctAnswer}</div><br />
                        </div>
                        ) :
                            (
                                <div>
                                    <div className="wrongAnswerSummary">Twoja odpowiedź: {userAnswers[4].userAnswer}<br />
                                        Poprawna odpowiedź: {questionsArray[4].correctAnswer}</div><br />
                                </div>
                            )}
                        <SubmitFinalResultButton
                            login={login}
                            setQuestionNumber={setQuestionNumber}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setIsSubmitSelectCategory={setIsSubmitSelectCategory}
                            correctAnswers={collectedPoints}
                            time={totalTimeOfAnserwing}
                            totalQuestions={5} />
                    </div>)
            }
        </div>


    )
}

export default Page;


