<!-- Navbar-->
<header class="app-header">
    <a class="app-header__logo" href="dashboard.php">Subdefy</a>
    <!-- Sidebar toggle button--><a class="app-sidebar__toggle" href="#" data-toggle="sidebar"
      aria-label="Hide Sidebar"></a>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">
      <!-- <li class="app-search">
        <input class="app-search__input" type="search" placeholder="Search" />
        <button class="app-search__button">
          <i class="fa fa-search"></i>
        </button>
      </li> -->
      <!--Notification Menu-->
      <!-- <li class="dropdown">
        <a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Show notifications"><i
            class="fa fa-bell-o fa-lg"></i></a>
        <ul class="app-notification dropdown-menu dropdown-menu-right">
          <li class="app-notification__title">
            You have 4 new notifications.
          </li>
          <div class="app-notification__content">
            <li>
              <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                    class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-primary"></i><i
                      class="fa fa-envelope fa-stack-1x fa-inverse"></i></span></span>
                <div>
                  <p class="app-notification__message">
                    Lisa sent you a mail
                  </p>
                  <p class="app-notification__meta">2 min ago</p>
                </div>
              </a>
            </li>
            <li>
              <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                    class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-danger"></i><i
                      class="fa fa-hdd-o fa-stack-1x fa-inverse"></i></span></span>
                <div>
                  <p class="app-notification__message">
                    Mail server not working
                  </p>
                  <p class="app-notification__meta">5 min ago</p>
                </div>
              </a>
            </li>
            <li>
              <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                    class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-success"></i><i
                      class="fa fa-money fa-stack-1x fa-inverse"></i></span></span>
                <div>
                  <p class="app-notification__message">
                    Transaction complete
                  </p>
                  <p class="app-notification__meta">2 days ago</p>
                </div>
              </a>
            </li>
            <div class="app-notification__content">
              <li>
                <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                      class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-primary"></i><i
                        class="fa fa-envelope fa-stack-1x fa-inverse"></i></span></span>
                  <div>
                    <p class="app-notification__message">
                      Lisa sent you a mail
                    </p>
                    <p class="app-notification__meta">2 min ago</p>
                  </div>
                </a>
              </li>
              <li>
                <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                      class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-danger"></i><i
                        class="fa fa-hdd-o fa-stack-1x fa-inverse"></i></span></span>
                  <div>
                    <p class="app-notification__message">
                      Mail server not working
                    </p>
                    <p class="app-notification__meta">5 min ago</p>
                  </div>
                </a>
              </li>
              <li>
                <a class="app-notification__item" href="javascript:;"><span class="app-notification__icon"><span
                      class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x text-success"></i><i
                        class="fa fa-money fa-stack-1x fa-inverse"></i></span></span>
                  <div>
                    <p class="app-notification__message">
                      Transaction complete
                    </p>
                    <p class="app-notification__meta">2 days ago</p>
                  </div>
                </a>
              </li>
            </div>
          </div>
          <li class="app-notification__footer">
            <a href="#">See all notifications.</a>
          </li>
        </ul>
      </li> -->
      <!-- User Menu-->
      <li class="dropdown">
        <a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i
            class="fa fa-user fa-lg"></i></a>
        <ul class="dropdown-menu settings-menu dropdown-menu-right">
          <li>
            <a class="dropdown-item" href="setting.php"><i class="fa fa-cog fa-lg"></i> Settings</a>
          </li>
          <!-- <li>
            <a class="dropdown-item" href="page-user.html"><i class="fa fa-user fa-lg"></i> Profile</a>
          </li> -->
          <li>
            <a class="dropdown-item" href="index.php"><i class="fa fa-sign-out fa-lg"></i> Logout</a>
          </li>
        </ul>
      </li>
    </ul>
  </header>
  <!-- Sidebar menu-->
  <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <img class="app-sidebar__user-avatar w-50px" src="assets/img/user-logo.jpg"
        alt="User Image" />
      <div>
        <p class="app-sidebar__user-name">Alok</p>
        <p class="app-sidebar__user-designation"><strong>Admin</strong></p>
      </div>
    </div>
    <ul class="app-menu">
      <li>
        <a class="app-menu__item active" href="dashboard.php"><i class="app-menu__icon fa fa-dashboard"></i><span
            class="app-menu__label">Dashboard</span></a>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-bell"></i><span
            class="app-menu__label">Subscription Master</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="upload_subscription.php"><i class="icon fa fa-circle-o"></i>Upload Subscription</a>
          </li>
          <li>
            <a class="treeview-item" href="manage_subscription.php"><i class="icon fa fa-circle-o"></i> Manage Subscription</a>
          </li>
        </ul>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-th-list"></i><span
            class="app-menu__label">CMS Setup</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="addpage.php"><i class="icon fa fa-circle-o"></i> Add page</a>
          </li>
        </ul>
      </li>
      <li>
        <a class="app-menu__item" href="usermanager.php"><i class="app-menu__icon fa fa-user"></i><span
            class="app-menu__label">User Manager</span></a>
      </li>
      <!-- <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-edit"></i><span
            class="app-menu__label">Forms</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="form-components.html"><i class="icon fa fa-circle-o"></i> Form Components</a>
          </li>
          <li>
            <a class="treeview-item" href="form-custom.html"><i class="icon fa fa-circle-o"></i> Custom Components</a>
          </li>
          <li>
            <a class="treeview-item" href="form-samples.html"><i class="icon fa fa-circle-o"></i> Form Samples</a>
          </li>
          <li>
            <a class="treeview-item" href="form-notifications.html"><i class="icon fa fa-circle-o"></i> Form
              Notifications</a>
          </li>
        </ul>
      </li> -->
      <li>
        <a class="app-menu__item" href="add_faq.php"><i class="app-menu__icon fa fa-question-circle"></i><span
        class="app-menu__label">FAQ'S</span></a>
      </li>
      <li>
        <a class="app-menu__item" href="add_blog.php"><i class="app-menu__icon fa fa-rss-square "></i><span
        class="app-menu__label">Blog's</span></a>
      </li>
      <li>
        <a class="app-menu__item" href="newsletter.php"><i class="app-menu__icon fa fa-envelope "></i><span
        class="app-menu__label">Newsletter</span></a>
      </li>
      <li class="treeview">
        <a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-cog"></i><span
            class="app-menu__label">Account Settings</span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="password.php"><i class="icon fa fa-circle-o"></i> Password Setting</a>
          </li>
          <li>
            <a class="treeview-item" href="smtpsetting.php"><i class="icon fa fa-circle-o"></i> SMTP Setting</a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>