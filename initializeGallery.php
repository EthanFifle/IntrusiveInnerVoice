<?php
require_once 'controller/GetUserImages.php';

// Get images from the database
$controller = new GetUserImages();
$imageArrays = $controller->getImages();
$imageArraysJSON = json_encode($imageArrays);

echo $imageArraysJSON;