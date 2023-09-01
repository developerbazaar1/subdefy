<!DOCTYPE html>
<html lang="en">

<head>
    <meta property="" content="" />
    <meta property="twitter:site" content="@developerbazaar" />
    <meta property="twitter:creator" content="@developerbazaar" />
    <meta property="" content="" />
    <meta property="" content="" />
    <meta charset="utf-8" />
    <title>Blank Page</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="assets/css/main.css" />
    <!-- dropify css -->
    <link rel="stylesheet" type="text/css" href="assets/css/dropify.min.css">
    <!--favicon-->
    <link rel="icon" type="image/x-icon" href="assets/img/subdefy-favicon.png">
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>

<body class="app sidebar-mini">

    <!-- header included  -->
    <?php include 'assets/include/header.php';?>
    <!-- header included end  -->

    <main class="app-content">
        <div class="app-title">
            <div>
                <h1><i class="fa fa-refresh mx-1"></i> Update Your SMTP </h1>
            </div>
        </div>
        <section class="setsmtp">
            <div class="row justify-content-center">
                <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="tile">
                        <div class="tile-body">
                            <!-- smtp setting form start from here  -->
                            <form autocomplete="off" onsubmit="" method="" class="smtp_setting">
                                <!-- form row from here -->
                                <div class=" cst-add-new-form row">
                                    <!-- form input  start from here -->
                                    <!-- field 01 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="mailer-mail">MAIL MAILER</label>
                                            <input class="form-control" id="exampleInputmailermail" type="text"
                                                aria-describedby="mail" placeholder="Enter Mailer Mail">
                                        </div>
                                    </div>
                                    <!-- field 02 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">MAIL HOST</label>
                                            <input class="form-control" id="exampleInputhost-mail" type="text"
                                                aria-describedby="host" placeholder="Enter Mail Host">
                                        </div>
                                    </div>
                                    <!-- field 03 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">MAIL PORT</label>
                                            <input class="form-control" id="exampleInputport-mail" type="text"
                                                aria-describedby="port" placeholder="Enter Mail Port">
                                        </div>
                                    </div>
                                    <!-- field 04 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">MAIL USER NAME</label>
                                            <input class="form-control" id="exampleInputuser-mail" autocomplete="off" type="text"
                                                aria-describedby="mail-user" placeholder="Enter Mail UserName">
                                        </div>
                                    </div>
                                    <!-- field 05 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head mb-2" for="host-mail">MAIL PASSWORD</label>
                                            <input class="form-control" id="exampleInputpassword-m-mail" autocomplete="off" type="password"
                                                aria-describedby="password-m-user" placeholder="Enter Mail Password">
                                        </div>
                                    </div>
                                    <!-- field 06 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">MAIL ENCRYPTION</label>
                                            <input class="form-control" id="exampleInputencryption-m-mail" type="text"
                                                aria-describedby="encryption-m-user"
                                                placeholder="Enter Mail Encryption">
                                        </div>
                                    </div>
                                    <!-- field 07 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">MAIL FROM ADDRESS</label>
                                            <input class="form-control" id="exampleInputaddress-mail" type="text"
                                                aria-describedby="from-m-address" placeholder="Enter Mail From Address">
                                        </div>
                                    </div>
                                    <!-- field 08 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="from-name">MAIL FROM NAME</label>
                                            <input class="form-control" id="exampleInputfrom-name" type="text"
                                                aria-describedby="encryption-m-user"
                                                placeholder="Enter Mail encryption">
                                        </div>
                                    </div>
                                </div>
                                <!-- :: submit button -->
                                <div class="form-group text-center mt-4">
                                    <a href="" class="btn btn-primary bt-mb-100 w-50 " id="" type="submit"><i
                                        class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>
                                        Update Setting
                                    </a>
                                </div>
                                <!-- :: submit button -->
                            </form>
                        </div>
                    </div>
                </div>
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