import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import { isAuthenticated, postFeedback } from "../../../util/studentApi";

// TODO: SET MEAL

function StudentFeedback() {
    const token = isAuthenticated() && isAuthenticated().studenttoken;
    let currentHour = new Date().getHours()
    let currentMeal = 'dinner'
    if(currentHour >= 8) currentMeal = 'breakfast'
    if(currentHour >= 12 && currentHour <= 7) currentMeal = 'lunch'

    const [feedback, setFeedback] = useState({meal: currentMeal, rating: 0, review: ''})

    return (
        <div>
            <h3 className="student-card-heading">Send feedback for the last meal</h3>
            <div className="feedback__form">
                <Rating 
                size="large"
                className="feedback__stars"
                value={feedback.rating} 
                onChange= {event => {setFeedback({ ...feedback, rating: parseInt(event.target.value) })}} 
                /> 
                <span className="feedback__ratingno"> ({feedback.rating}) </span>

                <textarea value={feedback.review} 
                placeholder="Any suggestions/comments on the last meal?"
                onChange={event => {setFeedback({ ...feedback, review: event.target.value })}} 
                />

                <Button
                variant="contained"
                color="primary"
                className="feedback__button"
                endIcon={<SendIcon />}
                onClick={() => {postFeedback(token, feedback); 
                                setFeedback({meal:"dinner", rating: 0, review: ''}); 
                                alert('Thanks for the review!')}
                        }
                >
                Send
                </Button>
            </div>

        </div>
    )
}

export default StudentFeedback
