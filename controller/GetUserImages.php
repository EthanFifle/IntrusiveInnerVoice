<?php
require_once 'model/Connection.php';
class GetUserImages
{
    private $model;

    function __construct()
    {
        $this->model = new Connection();
    }

    function getImages(): array
    {
        $query = $this->model->getImages();
        $imageArrays = array();

        // Iterate over the distinct p_ID values
        foreach(array_unique(array_column($query, 'p_ID')) as $pID) {
            // Initialize an empty array for this p_ID
            $imageArray = array();
            // Iterate over the rows for this p_ID
            foreach($query as $row) {
                if($row['p_ID'] == $pID) {
                    // Add an array with question and answer to the $imageArray
                    $imageArray[] = array('q_index' => $row['q_index'], 'a_index' => $row['a_index'], 'answer' => $row['a_string']);
                }
            }
            // Add the $imageArray to the $imageArrays array, with the p_ID as the key
            $imageArrays["image_$pID"] = $imageArray;
        }
        return $imageArrays;
    }

}