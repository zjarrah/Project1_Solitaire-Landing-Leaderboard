<?php 
include("../../Database/connection.php");

if(isset($_GET["limit"])){
    $limit = $_GET["limit"];
}else{
    $limit = -1;
}

if($limit == -1){
    $sql = "SELECT name, score, time FROM scores ORDER BY score DESC, time ASC";
    $query = $mysql->prepare($sql);
}else{
    $sql = "SELECT name, score, time FROM scores ORDER BY score DESC, time ASC LIMIT ?";
    $query = $mysql->prepare($sql);
    $query->bind_param("i", $limit);
}

$query->execute();

$array = $query->get_result();

$response = [];
$response["success"] = true;
$response["data"] = [];
while($article = $array->fetch_assoc()){
    $response["data"][] = $article;
}

echo json_encode($response);

?>