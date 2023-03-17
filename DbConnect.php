<?php
// Connect to the database
$servername = "localhost";
$database = "u880453721_IntrusiveIV";
$username = "u880453721_myahwills";
$password = "MyDegreeProject01$";

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection

if (!$conn) {

    die("Connection failed: " . mysqli_connect_error());

}

// Get data from JavaScript
$data = json_decode(file_get_contents("php://input"));

// Insert data into database
$sql = "INSERT INTO Image_Builder (Q1_Index, Q1_Ans,
                                   Q2a_Index, Q2a_Ans,
                                   Q2b_Index, Q2b_Ans,
                                   Q3_Index, Q3_Ans,
                                   Q4_Index, Q4_Ans,
                                   Q5_Index, Q5_Ans,
                                   Q6_Index, Q6_Ans) 
            VALUES ('".$data->Index1."', '".$data->Ans1."', 
                    '".$data->Index2a."', '".$data->Ans2a."',
                    '".$data->Index2b."', '".$data->Ans2b."',
                    '".$data->Index3."', '".$data->Ans3."',
                    '".$data->Index4."', '".$data->Ans4."',
                    '".$data->Index5."', '".$data->Ans5."',
                    '".$data->Index6."', '".$data->Ans6."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>