<!DOCTYPE html>
<html lang="en">

<head>
    <meta property="" content="" />
    <meta property="twitter:site" content="@developerbazaar" />
    <meta property="twitter:creator" content="@developerbazaar" />
    <meta property="" content="" />
    <meta property="" content="" />
    <meta charset="utf-8" />
    <title>settings</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="assets/css/main.css" />
    <!--favicon-->
    <link rel="icon" type="image/x-icon" href="assets/img/subdefy-favicon.png">
    <!-- Font-icon css-->
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>

<body class="app sidebar-mini">
    <!-- header included  --> <?php include 'assets/include/header.php';?>
    <!-- header included end  -->
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1>
                    <i class="fa fa-cogs mx-1"></i> Settings
                </h1>
            </div>
        </div>
        <!-- setting page content -->
        <section class="setting-reset-form">
            <!-- setting form start form here -->
            <div class="row setting-row">
                <div class=" w-100 text-center">
                    <h1>Forgot Password</h1>
                </div>
                <br>
                <form class="setting-form w-100 mt-3" onsubmit="#" autocomplete="off" >
                    <div class="form-group">
                        <label class="form-head" for="password">Password</label>
                        <input class="form-control" id="exampleInputpassword" type="text" aria-describedby="password"
                            placeholder="Enter Password">
                    </div>
                    <div class="form-group">
                        <label class="form-head" for="confirmpassword"> Confirm Password</label>
                        <input class="form-control mt-2" id="exampleInputpassword" type="password"
                            aria-describedby="password" placeholder="Enter Confirm Password">
                    </div>
                    <!-- submit button -->
                    <div class="form-group text-center mt-4">
                        <a href="" class="btn btn-primary bt-mb-100 w-50 " type="submit"><i
                                class="fa fa-paper-plane mx-2 pb-1" aria-hidden="true"></i>Reset Password</a>
                    </div>
                </form>
            </div>
        </section>
    </main>
    <!-- Essential javascripts for application to work-->
    <script src="assets/js/jquery-3.3.1.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/plugins/pace.min.js"></script>
</body>

</html>