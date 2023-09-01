@extends('admin.layouts.header')

@section('content')

<main class="app-content">
  <div class="app-title">
    <div>
      <h1>
        <i class="fa fa-envelope"></i> Newsletter
      </h1>
    </div>
  </div>
  <!-- newletter log section -->

  @if($message = Session::get('success'))
       <div class="alert alert-success alert-dismissible fade show w-100" role="alert">
         <strong>Success!</strong> {{ $message }}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
   @endif

   @if($message = Session::get('error'))
        <div class="alert alert-danger alert-dismissible fade show w-100" role="alert">
         <strong>Error!</strong> {{ $message }}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
   @endif


  <section class="newsletter-log">
    <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
        <div class="tile">
          <div class="tile-body">
            <div class="table-responsive">
              <!-- data download button (.csv) -->
              <a class="btn btn-info mb-2" id="downloadButton" href=""><i class="fa fa-download mb-1" aria-hidden="true"></i>Download</a>
              <!-- data download buton end (.csv) -->
              <!-- table start -->
              <table class="table table-hover table-bordered" id="sampleTable">
                <!-- table head -->
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Email</th>
                    <th>Date </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <!-- end table head -->
                <!-- table body start -->
                <tbody>
                  @if(count($newsletters) > 0)
                     @php
                          $sno = 1;
                     @endphp
                     @foreach($newsletters as $newsletter)

                      <tr>
                        <td>{{$sno}}</td>
                        <td>{{$newsletter->email}}</td>
                        @php
                          $old_date_timestamp = strtotime($newsletter->created_at);
                          $new_date = date('d-m-Y', $old_date_timestamp);  
                        @endphp
                        <td>{{$new_date}}</td>
                        <td class="">
                          <span>
                            <a href="#" class="delet-btn demoSwal" id="demoSwal"  data-id="{{$newsletter->id}}" data-uri="delete-newsletter">
                              <i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
                            </a>
                          </span>
                        </td>
                      </tr>
                  
                  @php
                       $sno++;
                     @endphp
                    @endforeach
                  @endif

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

@endsection
@section('scripts') 


<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/jquery.dataTables.min.js') }}"></script>
		<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/dataTables.bootstrap.min.js') }}"></script>
		<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/sweetalert.min.js') }}"></script>
		
    <script type="text/javascript">
      $('#sampleTable').DataTable();
      
       $('.demoSwal').click(function(){

        var id = jQuery(this).attr('data-id');
        var uri = jQuery(this).attr('data-uri');
       var APP_URL = {!! json_encode(url('/')) !!}
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover this data!",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function(isConfirm) {
          if (isConfirm) {
            swal("Deleted!", "Your data has been deleted.", "success");
            window.location.href=APP_URL+"/"+uri+"/"+id;
          } else {
            swal("Cancelled", "Your data is safe :)", "error");
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
    var blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });

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

@endsection