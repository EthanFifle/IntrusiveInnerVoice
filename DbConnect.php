<?php

$servername = "localhost";
$database = "intrusiveinnervoice";
$username = "root";
$password = "MyDataConnect01$";

$conn = mysqli_connect("localhost", $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the submitted answers
$databaseAns = json_decode($_POST['databaseAns'], true);

// Loop through the answers and insert them into the database
foreach ($databaseAns as $answer) {
    // Get the question and answer indices
    $uniqueID = $answer['p_ID'];
    $questionIndex = $answer['q_index'];
    $answerIndex = $answer['a_index'];
    $answerString = $answer['answer'];

    // Sanitize the inputs to prevent SQL injection attacks
    $uniqueID = mysqli_real_escape_string($conn, $uniqueID);
    $questionIndex = mysqli_real_escape_string($conn, $questionIndex);
    $answerIndex = mysqli_real_escape_string($conn, $answerIndex);
    $answerString = mysqli_real_escape_string($conn, $answerString);

    // Build and execute the SQL query to insert the answer
    $sql = "INSERT INTO test_table (p_ID, q_index, a_index, a_string) VALUES ('$uniqueID','$questionIndex', '$answerIndex', '$answerString')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
mysqli_close($conn);
?>