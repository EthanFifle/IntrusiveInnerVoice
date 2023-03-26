<?php

class Connection
{
    private $servername = "localhost";
    private $database = $_ENV['DATABASE'];
    private $username = $_ENV['DB_USER'];
    private $password = $_ENV['DB_PASS'];
    private $conn;

    function __construct()
    {
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->database);

        if (!$this->conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
    }

    function __destruct()
    {
        mysqli_close($this->conn);
    }

    function insertAnswer($uniqueID, $date, $time, $questionIndex, $answerIndex, $answerString)
    {
        $uniqueID = mysqli_real_escape_string($this->conn, $uniqueID);
        $date = mysqli_real_escape_string($this->conn, $date);
        $time = mysqli_real_escape_string($this->conn, $time);
        $questionIndex = mysqli_real_escape_string($this->conn, $questionIndex);
        $answerIndex = mysqli_real_escape_string($this->conn, $answerIndex);
        $answerString = mysqli_real_escape_string($this->conn, $answerString);

        $sql = " INSERT INTO ImageBuilder (p_ID, _date, _time, q_index, a_index, a_string) VALUES ('$uniqueID','$date','$time','$questionIndex','$answerIndex','$answerString')";

        if (mysqli_query($this->conn, $sql)) {
            return true;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
            return false;
        }
    }
}