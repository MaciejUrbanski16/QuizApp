import { useState } from "react";
import Select from 'react-select'

import axios from './api/axios'

const Page = () => {

    const dbGeographyUrl = 'api/db/geography'
    const dbHistoryUrl = 'appi/db/history'

    const options = [
        { value: 'geografia', label: 'Geografia' },
        { value: 'fizyka', label: 'Fizyka' },
        { value: 'matematyka', label: 'Matematyka' }
    ];

    const [selectedCategory, setSelectedCategory] = useState('geography');

    const [id, setId] = useState(0);
    const [question, setQuestion] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleSelectCategory = ( selectedOption) => {
        //e.preventDefault();
        setSelectedCategory(selectedOption);
        console.log(`Option selected:`, selectedOption);

        // try {
        //     const response = await axios.post(dbGeographyUrl, JSON.stringify({
        //         id,
        //         question,
        //         answerA,
        //         answerB,
        //         answerC,
        //         answerD,
        //         correctAnswer
        //     }),
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',

        //             }
        //         }
        //     )

        //     console.log(response.data)

        //     console.log(JSON.stringify(response))


        // } catch (error) {
        //     if (!error?.response) {
        //         console.log('No internet connection')
        //     }
        //     else if (error.response?.status === 409) {
        //         console.log('User name taken')
        //     }
        //     else {
        //         console.log('Registration failed')
        //     }

        //     //errRef.current.focus()
        // }
    }

    return (
        <form className="Page">
            <div id="categoryChoice">
                Jesli chcesz wziac udzial w quizie wybierz kategorie sposrod dostepnych


                <Select options={options} onChange={handleSelectCategory} autoFocus={true} />
                <input className="submitChooseCategory" type="submit" value="Wybierz kategorie" /><br />
            </div>
            <br />
        </form>
    )
}

export default Page;


