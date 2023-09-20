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
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('assets/css/login.css') }}" />
    <!--favicon-->
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('assets/img/subdefy-favicon.png') }}">
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
                            <img class="w-50 header-logo" src="{{ URL::asset('assets/img/logo.png') }}" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="appform-wrapper">
        <div class="appform-container clearfix">
            <div class="panel panel-small" id="cst-b">
                <img class="form-top-icon" src="{{ URL::asset('assets/img/login-.png') }}">
                <h2 class="panel-heading"> Admin Login</h2>
                <form method="POST" id="panel-form"  action="{{ route('login') }}" autocomplete="off">
                    @csrf
                     @if ($errors->any())
                           <div class="alert alert-danger">
                              <ul style="padding: 0px; margin: 0;">
                                 @foreach ($errors->all() as $error)
                                       <li style="color:red; display:flex">{{ $error }}</li>
                                 @endforeach
                              </ul>
                           </div>
                     @endif
                    <div class="appform-group">
                        <label>Username</label>
                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" >
                        <!--@error('email')-->
                        <!--    <span class="invalid-feedback" role="alert" style="color:red; display:flex">-->
                        <!--        <strong>{{ $message }}</strong>-->
                        <!--    </span>-->
                        <!--@enderror-->
                    </div>

                    <div class="appform-group">
                        <label>Password</label>
                        <div class="password-wrapper">
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password"  autocomplete="current-password" >
                            <span class="password-toggle">
                                <i class="fa fa-eye"></i>
                            </span>
                            <!--@error('password')-->
                            <!--    <span class="invalid-feedback" role="alert" style="color:red; display:flex">-->
                            <!--        <strong>{{ $message }}</strong>-->
                            <!--    </span>-->
                            <!--@enderror-->
                        </div>
                    </div>

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
    <script src="{{ URL::asset('assets/js/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/popper.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/main.js') }}"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="{{ URL::asset('assets/js/plugins/pace.min.js') }}"></script>
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




