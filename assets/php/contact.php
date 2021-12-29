Hi <?php echo htmlspecialchars($_POST['first-name']); ?>.
You are <?php echo (int)$_POST['email']; ?> years old.



<?php 
/*if(isset($_POST['submit'])){
    $to = "joshmboisvert@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $first_name = $_POST['first-name'];
    $last_name = $_POST['last-name'];
    $subject = "Form submission";
    $message = $first_name . " " . $last_name . " wrote the following:" . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }*/
?>