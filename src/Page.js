import { useState } from "react";
import Select from 'react-select'
import RankingButton from "./RankingButton";
import LogoutButton from "./LogoutButton";

import axios from './api/axios'

import './Page.css'

const Page = () => {

    const dbGeographyUrl = 'api/db/geography'
    const dbHistoryUrl = 'api/db/history'

    const options = [
        { value: 'geografia', label: 'Geografia' },
        { value: 'fizyka', label: 'Fizyka' },
        { value: 'matematyka', label: 'Matematyka' }
    ];

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
                        Your answers were:
                    </div>)
            }



        </div>


    )
}

export default Page;


