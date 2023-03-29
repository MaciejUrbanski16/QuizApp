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


    return (
        <div>
            {
                selectedCategory.value === 'geografia' ? (
                    <div>

                        {question} <br />
                        {answerA} <br />
                        {answerB} <br />
                        {answerC} <br />
                        {answerD} <br />
                        Czy chcesz poaznac prawidlowa odpowiedz ??
                        <button onClick={handleNextQuestion}></button>
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
            }


        </div>


    )
}

export default Page;


