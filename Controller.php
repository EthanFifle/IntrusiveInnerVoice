<?php

require_once 'controller/SendUserResponse.php';
$userAnswers = json_decode($_POST['databaseAns'], true);

// Create a new instance of the Controller class
$controller = new SendUserResponse();

// Call the sendResponse() method to handle the user's responses
$controller->sendResponse($userAnswers);
?>

