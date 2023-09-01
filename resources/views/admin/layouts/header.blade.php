<!DOCTYPE html>
<html lang="en">

<head>
    <meta property="#" content="#">
    <meta property="#" content="#">
    <meta property="#" content="#">
    <meta charset="utf-8">
    <title>Subdefy</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('assets/css/main.css') }}">
    <!--favicon-->
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('assets/img/subdefy-favicon.png') }}">
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('assets/css/dropify.min.css') }}">
    <script src="https://kit.fontawesome.com/5f5af28768.js" crossorigin="anonymous"></script>
</head>
<!-- body start -->

<body class="app sidebar-mini">

    <!-- header included  -->
    <!-- Navbar-->
<header class="app-header">
    <a class="app-header__logo" href="dashboard.php">Subdefy</a>
    <!-- Sidebar toggle button--><a class="app-sidebar__toggle" href="#" data-toggle="sidebar"
      aria-label="Hide Sidebar"></a>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">
     
      <!-- User Menu-->
      <li class="dropdown">
        <a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i
            class="fa fa-user fa-lg"></i></a>
        <ul class="dropdown-menu settings-menu dropdown-menu-right">
          <li>
            <a class="dropdown-item" href="{{ route('password-setting') }}"><i class="fa fa-cog fa-lg"></i> Settings</a>
          </li>
          <!-- <li>
            <a class="dropdown-item" href="page-user.html"><i class="fa fa-user fa-lg"></i> Profile</a>
          </li> -->
          <!-- <li>
            <a class="dropdown-item" href="index.php"><i class="fa fa-sign-out fa-lg"></i> Logout</a>
          </li> -->
          <li><a href="{{ route('logout') }}" class="dropdown-item" onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();"><i class="fa fa-sign-out fa-lg"></i> Logout</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
          </form></li>
        </ul>
      </li>
    </ul>
  </header>
  <!-- Sidebar menu-->
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <img class="app-sidebar__user-avatar w-50px" src="{{ URL::asset('assets/img/user-logo.jpg') }}"
        alt="User Image" />
      <div>
        <p class="app-sidebar__user-name">@php echo ucfirst(Auth::user()->name); @endphp</p>
        <p class="app-sidebar__user-designation"><strong>@php echo ucfirst(Auth::user()->user_role); @endphp</strong></p>
      </div>
    </div>
    <ul class="app-menu">
      <li>
        <a class="app-menu__item active" href="{{ route('home') }}"><i class="app-menu__icon fa fa-dashboard"></i><span
            class="app-menu__label">Dashboard</span></a>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-bell"></i><span
            class="app-menu__label">Subscription Master</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="{{ route('subscription') }}"><i class="icon fa fa-share"></i>Upload Subscription</a>
          </li>
          <li>
            <a class="treeview-item" href="{{ route('plans') }}"><i class="icon fa fa-share"></i> Subscription Plans</a>
          </li>
          <!-- <li>
            <a class="treeview-item" href="manage_subscription.php"><i class="icon fa fa-share"></i> Manage Subscription</a>
          </li> -->
        </ul>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-th-list"></i><span
            class="app-menu__label">CMS Setup</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="{{ route('pages') }}"><i class="icon fa fa-circle-o"></i> Add page</a>
          </li>
        </ul>
      </li>
      <li>
        <a class="app-menu__item" href="{{ route('users') }}"><i class="app-menu__icon fa fa-user"></i><span
            class="app-menu__label">User Manager</span></a>
      </li>
      
      <li>
        <a class="app-menu__item" href="{{ route('faq') }}"><i class="app-menu__icon fa fa-question-circle"></i><span
        class="app-menu__label">FAQ'S</span></a>
      </li>
      <li>
        <a class="app-menu__item" href="{{ route('blog-add') }}"><i class="app-menu__icon fa fa-rss-square "></i><span
        class="app-menu__label">Blog's</span></a>
      </li>
      <li>
        <a class="app-menu__item" href="{{ route('newsletter') }}"><i class="app-menu__icon fa fa-envelope "></i><span
        class="app-menu__label">Newsletter</span></a>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-cog"></i><span
            class="app-menu__label">Account Settings</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="{{ route('password-setting') }}"><i class="icon fa fa-circle-o"></i> Password Setting</a>
          </li>
          <li>
            <a class="treeview-item" href="{{ route('smtp-setting') }}"><i class="icon fa fa-circle-o"></i> SMTP Setting</a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
    <!-- header included end  -->

    <!-- main start -->
  
    <!--begin::Content-->
    @yield('content')
    <!--end::Content-->

    <!--begin::Footer-->
    @include('admin.layouts.footer')

    </body>
</html>