<?php
$servername = "localhost";
$username = "root";
$password = "root";

// Create connection
$conn = mysqli_connect("127.0.0.1", "user", "user", "database", "3306");

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>