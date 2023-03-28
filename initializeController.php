<?php

require_once 'controller/SendUserResponse.php';

// Send user answers to the database
$userAnswers = json_decode($_POST['databaseAns'], true);
$controller = new SendUserResponse();
$controller->sendResponse($userAnswers);

