<!DOCTYPE html>
<html lang="en">
	<head>
		<meta property="" content="" />
		<meta property="twitter:site" content="@developerbazaar" />
		<meta property="twitter:creator" content="@developerbazaar" />
		<meta property="" content="" />
		<meta property="" content="" />
		<meta charset="utf-8" />
		<title>usermanager</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- Main CSS-->
		<link rel="stylesheet" type="text/css" href="assets/css/main.css" />
		<!-- dropify css -->
		<link rel="stylesheet" type="text/css" href="assets/css/dropify.min.css">
		<!--favicon-->
		<link rel="icon" type="image/x-icon" href="assets/img/subdefy-favicon.png">
		<!-- Font-icon css-->
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
		<!--fontawesome icons-->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	</head>
	<!-- body start here -->
	<body class="app sidebar-mini">
		<!-- header included  --> <?php include 'assets/include/header.php';?>
		<!-- header included end  -->
		<!-- main start here -->
		<main class="app-content">
			<div class="app-title">
				<div>
					<h1>
						<i class="fa fa-bell"></i> Upload Subscription
					</h1>
				</div>
			</div>
			<!-- upload subscription start from here -->
			<section class="upload_subscription">
				<div class="row justify-content-center">
					<div class="col-md-8 col-sm-12 col-xs-12 col-lg-8">
						<div class="tile">
							<div class="tile-body">
								<!-- upload subscription form start from here -->
								<form class="upload_subscription_details" onsubmit=() action="" id="">
									<!-- field col  start :: dropify-->
									<div class="form-group">
										<label class="form-head mb-2" for="exampletext"> Upload File </label>
										<input name="file1" type="file" class="dropify" data-height="100" data-allowed-file-extensions="csv exe" />
									</div>
									<!-- field col  enc :: dropify-->
									<!-- :: submit btn -->
									<div class="form-group text-center mt-4">
										<a href="" class="btn btn-primary bt-mb-100 w-50 " type="submit">
											<i class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Submit Subscription </a>
									</div>
									<!-- :: submit btn -->
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- upload subscription ends here -->
			<!-- upload manager log section -->
			<section class="upload_manage_-log">
				<div class="row">
					<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
						<div class="tile">
							<div class="tile-body">
								<div class="table-responsive">
									<!-- data download button (.csv) -->
									<a class="btn btn-info mb-2" id="downloadButton" href="">
										<i class="fa fa-download mb-1" aria-hidden="true"></i>Download </a>
									<!-- data download buton end (.csv) -->
									<!-- table start -->
									<table class="table table-hover table-bordered" id="sampleTable">
										<!-- table head -->
										<thead>
											<tr>
												<th>Sr.No</th>
												<th>Updated Date</th>
												<th>Ip Protocol</th>
												<th>Action</th>
											</tr>
										</thead>
										<!-- end table head -->
										<!-- table body start -->
										<tbody>
											<!-- table data start from here -->
											<!-- :: td 01 -->
											<tr>
												<td>01</td>
												<td>10/07/23</td>
												<td>0154548792SUB</td>
												<td class="">
													<span>
														<a href="#" class="delet-btn" id="demoSwal">
															<i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
														</a>
													</span>
												</td>
											</tr>

                      <!-- :: td 02 -->
											<tr>
												<td>02</td>
												<td>7/07/23</td>
												<td>0895642792SUB</td>
												<td class="">
													<span>
														<a href="#" class="delet-btn" id="demoSwal">
															<i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
														</a>
													</span>
												</td>
											</tr>
										</tbody>
										<!-- end table body -->
									</table>
									<!-- table end -->
								</div>
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
		<script type="text/javascript" src="Assets/js/plugins/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="Assets/js/plugins/dataTables.bootstrap.min.js"></script>
		<script type="text/javascript" src="Assets/js/plugins/sweetalert.min.js"></script>
		<script type="text/javascript" src="assets/js/plugins/subdefy_dropify.min.js"></script>
		<script>
			$('.dropify').dropify();
		</script>
		<script>
			// script for data table 
			$('#sampleTable').DataTable();
			// script for data alert
			$('#demoSwal').click(function() {
				swal({
					title: "Are you sure?",
					text: "You will not be able to recover this imaginary file!",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Yes, delete it!",
					cancelButtonText: "No, cancel plx!",
					closeOnConfirm: false,
					closeOnCancel: false
				}, function(isConfirm) {
					if (isConfirm) {
						swal("Deleted!", "Your imaginary file has been deleted.", "success");
					} else {
						swal("Cancelled", "Your imaginary file is safe :)", "error");
					}
				});
			});
		</script>
		<!-- script for table data download  -->
		<script>
			function downloadTableAsCSV() {
				// Get the table element
				var table = document.getElementById('sampleTable');
				// Create an empty array to store the table rows as CSV rows
				var rows = [];
				// Iterate over the table rows
				for (var i = 0; i < table.rows.length; i++) {
					var row = table.rows[i];
					var rowData = [];
					// Iterate over the table cells in the current row
					for (var j = 0; j < row.cells.length; j++) {
						var cell = row.cells[j];
						rowData.push('"' + cell.textContent.replace(/"/g, '""') + '"');
					}
					// Push the row data to the rows array
					rows.push(rowData);
				}
				// Convert the rows array to CSV content
				var csvContent = rows.map(function(row) {
					return row.join(',');
				}).join('\n');
				// Create a Blob object with the CSV content
				var blob = new Blob(["\ufeff" + csvContent], {
					type: 'text/csv;charset=utf-8;'
				});
				// Create a temporary link element
				var link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = 'table_data.csv';
				// Append the link to the document body and click it programmatically to start the download
				document.body.appendChild(link);
				link.click();
				// Clean up by removing the link from the document body
				document.body.removeChild(link);
			}
			// Add a click event listener to the "Download" button
			var downloadButton = document.getElementById('downloadButton');
			downloadButton.addEventListener('click', downloadTableAsCSV);
		</script>
		<!-- script end for table data download  -->
	</body>
</html>