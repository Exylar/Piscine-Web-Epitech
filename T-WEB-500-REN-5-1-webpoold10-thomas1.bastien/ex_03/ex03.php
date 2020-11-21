<?php
    $email = $_POST["email"];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $myJSON = json_encode("Email address '$email' is considered valid.\n");
    } else {
        $myJSON = json_encode("Email address '$email' is considered invalid.\n");
    }
    echo $myJSON;
?>