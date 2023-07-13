<!DOCTYPE html>
<html lang="en">
	<head>
		<meta property="" content="" />
		<meta property="twitter:site" content="@developerbazaar" />
		<meta property="twitter:creator" content="@developerbazaar" />
		<meta property="" content="" />
		<meta property="" content="" />
		<meta charset="utf-8" />
		<title>add_blog</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- Main CSS-->
		<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
		<!--favicon-->
		<link rel="icon" type="image/x-icon" href="assets/img/subdefy-favicon.png">
		<!-- dropify css -->
		<link rel="stylesheet" type="text/css" href="assets/css/dropify.min.css">
		<!-- Font-icon css-->
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
		<!-- font awesome icon kit  -->
		<script src="https://kit.fontawesome.com/5f5af28768.js" crossorigin="anonymous"></script>
	</head>
	<!-- body start -->
	<body class="app sidebar-mini">
		<!-- header included  --> <?php include 'assets/include/header.php';?>
		<!-- header included end  -->
		<!-- main start  -->
		<main class="app-content">
			<div class="app-title">
				<div>
					<h1>
						<i class="fa fa-pencil-square mx-1"></i> Add Blogs
					</h1>
					<!-- <p>Start a beautiful journey here</p> -->
				</div>
			</div>
			<!-- content start -->
			<section class="blog-update">
				<div class="row justify-content-center">
					<div class="col-md-12">
						<div class="tile">
							<div class="tile-body">
								<form class="blog-update-form" method="" onsubmit="" id="" action="">
									<!-- form row 01 start from here -->
									<div class=" cst-add-new-form row">
										<!-- form input  start from here -->

										<!-- field col  start :: dropify-->
										<div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
											<div class="form-group">
												<label class="form-head mb-2" for="exampletext"> Blog Thumbnails </label>
												<input name="file1" type="file" class="dropify" data-height="100" data-allowed-file-extensions="jpeg jpg png" />
											</div>
										</div>
										<!-- field col  enc :: dropify-->

										<!-- field 02 col start from here -->
										<div class="col-lg-8 col-sm-8 col-md-8 col-xs-12">
											<div class="form-group">
												<label class="form-head" for="mailer-mail"> Blog Title</label>
												<input class="form-control" id="exampleInputtitle" type="text" aria-describedby="title" placeholder="Enter Your Blog Title">
											</div>

											<!-- field 03 -->
											<div class="form-group">
												<label class="form-head" for="mailer-mail"> Blog Category</label>
												<input class="form-control" id="exampleInputcategory" type="text" aria-describedby="category" placeholder="Enter Your Blog Category">
											</div>

											<!-- field 04 -->
											<div class="form-group">
												<label class="form-head mb-2" for="mailer-mail"> Publish Date</label>
												<input class="form-control" id="exampleInputdate" type="date" aria-describedby="date" placeholder="Enter your publish date">
											</div>
										</div>
									</div>
									<!-- :: row 02 for tiny mce edit  -->
									<div class=" cst-add-new-form row">
										<div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
											<div class="form-group">
												<label class="form-head mb-2" for="exampletext"> Blog Description </label>
												<tinymce-editor api-key="l0xp8n0asjxeoofeo9h30icll510jblob20r38r92ecoyw00" height="300" menubar="false" plugins="advlist autolink lists link image charmap preview  anchor
                                                     searchreplace visualblocks code fullscreen
                                                    insertdatetime media table code help wordcount" toolbar="undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments |    spellcheckdialog a11ycheck typography | align lineheight | checklist numlist  bullist indent outdent | emoticons charmap | removeformat help" content_style="body
                                                    {
                                                       font-family:Helvetica,Arial,sans-serif;
                                                        font-size:14px
                                                    }">
												</tinymce-editor>
											</div>
										</div>
									</div>
									<!-- :: submit btn -->
									<div class="form-group text-center mt-4">
                                        <a href="" class="btn btn-primary bt-mb-100 w-50 " type="submit"><i
                                        class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Submit Page</a>
                                    </div>
                                    <!-- :: submit btn -->
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
		<!-- The javascript plugin to display page loading on top-->
		<script src="assets/js/plugins/pace.min.js"></script>
		<script src="assets/js/plugins/tinymce-editor.js"></script>
		<script type="text/javascript" src="assets/js/plugins/subdefy_dropify.min.js"></script>
		<script>
			$('.dropify').dropify();
		</script>
	</body>
</html>