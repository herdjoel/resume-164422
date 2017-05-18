<?php
header("Content-type: text/plain");
function bail($statusCode, $errorMessage) {
    header("HTTP/1.1 $statusCode $errorMEssage");
    die($errorMessage);
}
if (!isset($_GET["filename"])) {
    bail(400, "You must pass a filename for this webservice.");
}
$textRegexPattern = "/.*\.txt$/";
$filename = $_GET["filename"];
if (preg_match($textRegexPattern, $filename)) {
    // checks to see if input is looking for other files in other folders
    // if (preg_match("@/@", $filename)) {
    //     bail(400, "Permissions Invalid");
    // }
    print file_get_contents($filename);
} else {
    bail(400, "This web service only vends .txt files");
}
?>