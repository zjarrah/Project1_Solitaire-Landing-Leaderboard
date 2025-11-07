<?php 
include("../../Database/connection.php");

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data["name"]) && $data["name"] != ""){
    $name = $data["name"];
    $score = mt_rand(0, 40000);
    $randomSeconds = mt_rand(0, 86399); // max seconds in a day
    $time = gmdate("H:i:s", $randomSeconds);
}else{
    $response = [];
    $response["success"] = false;
    $response["error"] = "Name field is missing";
    echo json_encode($response);
    return;
}


$query = $mysql->prepare("INSERT INTO scores(name, score, time) VALUES (?,?,?)");
$query->bind_param("sis", $name, $score, $time);
$query->execute();

$response = [];
$response["success"] = true;
echo json_encode($response);

?>