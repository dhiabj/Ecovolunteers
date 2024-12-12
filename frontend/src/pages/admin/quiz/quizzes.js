import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./quizzes.css";
import { Link } from 'react-router-dom';

function Quizzes() {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:5000/question/questions')
            .then(response => setQuestions(response.data))
            .catch(error => console.log(error));
        console.log(currentPage)
    }, []);

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>All Questions</h2>
            <Link to='quiz/addquiz'>
                <button className='addquestionquiz'>Add Question</button>
            </Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Answer</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {currentQuestions.map(question => (
                        <tr key={question._id}>
                            <td>{question.que_title}</td>
                            <td>{question.option1}</td>
                            <td>{question.option2}</td>
                            <td>{question.option3}</td>
                            <td>{question.option4}</td>
                            <td>{question.ans}</td>
                            <td>
                                <Link to={`quiz/${question._id}`}>
                                    <img src='/imgs/employee.png' alt='View details' />
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                questionsPerPage={questionsPerPage}
                totalQuestions={questions.length}
                paginate={paginate}
            />
        </div>
    );
}

export default Quizzes;

function Pagination({ questionsPerPage, totalQuestions, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
