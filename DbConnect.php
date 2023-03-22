<?php

$servername = "localhost";
$database = "u880453721_IntrusiveIV";
$username = "u880453721_myahwills";
$password = "MyDegreeProject01$";

$conn = mysqli_connect("localhost", $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the submitted answers
$databaseAns = json_decode($_POST['databaseAns'], true);
$date = $_POST['date'];
$time = $_POST['time'];

// Loop through the answers and insert them into the database
foreach ($databaseAns as $answer) {
    // Get the question and answer indices
    $uniqueID = $answer['p_ID'];
    $questionIndex = $answer['q_index'];
    $answerIndex = $answer['a_index'];
    $answerString = $answer['answer'];

    // Sanitize the inputs to prevent SQL injection attacks
    $uniqueID = mysqli_real_escape_string($conn, $uniqueID);
    $date = mysqli_real_escape_string($conn, $date);
    $time = mysqli_real_escape_string($conn, $time);
    $questionIndex = mysqli_real_escape_string($conn, $questionIndex);
    $answerIndex = mysqli_real_escape_string($conn, $answerIndex);
    $answerString = mysqli_real_escape_string($conn, $answerString);

    // Build and execute the SQL query to insert the answer
    $sql = " INSERT INTO ImageBuilder (p_ID, _date, _time, q_index, a_index, a_string) VALUES ('$uniqueID','$date','$time','$questionIndex','$answerIndex','$answerString')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
mysqli_close($conn);
?>