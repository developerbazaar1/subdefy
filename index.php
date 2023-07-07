<!DOCTYPE html>
<html lang="en">

<head>
    <meta property="" content="" />
    <meta property="twitter:site" content="@developerbazaar" />
    <meta property="twitter:creator" content="@developerbazaar" />
    <meta property="" content="" />
    <meta property="" content="" />
    <meta charset="utf-8" />
    <title>login-subdefy</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="assets/css/login.css" />
    <!--favicon-->
    <link rel="icon" type="image/x-icon" href="assets/img/subdefy-favicon.png">
    <!-- Font-icon css-->
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
</head>

<body class="appform-page loginpage">
    <section class="header">
        <div class="header-login">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                        <div class="header-icon text-center">
                            <img class="w-50 header-logo" src="assets/img/logo.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="appform-wrapper">
        <div class="appform-container clearfix">
            <div class="panel panel-small" id="cst-b">
                <img class="form-top-icon" src="assets/img/login-.png">
                <h2 class="panel-heading"> Admin Login</h2>
                <form id="panel-form" action="dashboard.php" method="POST" autocomplete="off">
                    <div class="appform-group">
                        <label>Username</label>
                        <input type="text" required="" />
                    </div>
                    <div class="appform-group">
                        <label>Password</label>
                        <div class="password-wrapper">
                            <input type="password" id="password" required="" />
                            <span class="password-toggle">
                                <i class="fa fa-eye"></i>
                            </span>
                        </div>
                    </div>
                    <!-- <div class="appform-checkbox clearfix"><div class="appform-checkbox-button"><input type="checkbox" id="remember" checked=""><label for="remember"></label></div><span>Remember Me</span></div> -->
                    <input type="submit" class="appform-button" value="Login" />
                </form>
                <br />
                <p id="panel-bottom"><a href="#">Forgot your password?</a></p>
                <!-- <p>Don't have an account? <a href="#">Register!</a></p> -->
            </div>
            <!-- <p id="panel-bottom"><a href="#">Forgot your password?</a></p> -->
        </div>
    </div>
    <section class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="footer-text d-flex">
                        <span>© 2021 - 2025 | WooEnglish | All Rights Reserved | Designed &amp; Developed By <a
                                href="https://www.developerbazaar.com">
                                <span style="color: red"> Developer </span>
                                <span style="color: limegreen"> Bazaar</span>
                                <span style="color: red"> Technologies </span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- JS -->
    <!-- Essential javascripts for application to work-->
    <script src="assets/js/jquery-3.3.1.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/main.js"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="assets/js/plugins/pace.min.js"></script>
    <!-- Page specific javascripts-->
    <!-- Google analytics script-->
    <script type="text/javascript">
    jQuery(function($) {
        "use strict";
        var $main_wrapper = $("#appform-wrapper"),
            $modify_form = $main_wrapper.find("#panel-form"),
            $input_wrapper_class = ".appform-group",
            $form_field = $modify_form.find($input_wrapper_class),
            $empty_inputs = $modify_form.find("input").filter(function() {
                return $(this).val() != "";
            }),
            $mobile_menu_button = $(".et_mobile_menu_button"),
            $main_nav = $("#main-nav"),
            $main_header = $("#main-header"),
            $mobile_menu = $("#main-nav nav"),
            $cta = $("#bottom-info-wrapper"),
            $body = $("body"),
            $pricing_tables = $("#packages2"),
            filled_class = "appform-filled";
        $(window).scroll(function() {
            var scrollPercentage = 100 * ($(this).scrollTop() / $body.height()),
                newClass,
                header = $("#main-nav");
            if (scrollPercentage >= 50) {
                newClass = "et_highlight_nav";
            }
            $(header).addClass(newClass);
        });
        $form_field.focusin(function() {
            $(this).addClass(filled_class);
        }).focusout(function() {
            var $this = $(this);
            if ($this.find("input").val() === "") {
                $this.removeClass(filled_class);
            }
        });
    })(jQuery);
    </script>
    <script>
    $(document).ready(function() {
        $('.password-toggle').click(function() {
            var passwordField = $('#password');
            var passwordFieldType = passwordField.attr('type');
            var eyeIcon = $(this).find('i');
            if (passwordFieldType === 'password') {
                passwordField.attr('type', 'text');
                eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                passwordField.attr('type', 'password');
                eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        });
    });
    </script>
</body>

</html>