<?php
date_default_timezone_set('America/New_York');
require_once 'model/Connection.php';
class SendUserResponse
{
    private $model;

    function __construct()
    {
        $this->model = new Connection();
    }

    function sendResponse($userAnswers)
    {
        $dateTime = new DateTime();
        $date = $dateTime->format('m-d-Y');
        $time = $dateTime->format('g:i:s A'); //Make into canada time zone

        foreach ($userAnswers as $answer) {
            $uniqueID = $answer['p_ID'];
            $questionIndex = $answer['q_index'];
            $answerIndex = $answer['a_index'];
            $answerString = $answer['answer'];

            $this->model->insertAnswer($uniqueID, $date, $time, $questionIndex, $answerIndex, $answerString);
        }
    }
}
