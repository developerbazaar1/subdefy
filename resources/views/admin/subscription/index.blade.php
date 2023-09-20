@extends('admin.layouts.header')

@section('content')


    <main class="app-content">
        <div class="app-title">
            <div>
                <h1>
                    <i class="fa fa-bell"></i> Upload Subscription
                </h1>
            </div>
        </div>

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
        <!-- upload subscription start from here -->
        <section class="upload_subscription">
            <div class="row justify-content-center">
                <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <div class="tile">
                        <div class="tile-body">
                            <!-- upload subscription form start from here -->
                            <form class="upload_subscription_details"  action="{{ route('subscription-import') }}" method="POST" enctype="multipart/form-data">
                                    @csrf
                                <!-- field col  start :: dropify-->
                                <div class="form-group">
                                    <label class="form-head mb-2" for="exampletext"> Upload Subscription File </label>
                                    <a type="button" class="float-right m-auto btn btn-danger btn-sm  mb-3 op-btn them" href="{{ asset('assets/excel-formate-files/subscription.xlsx')}}"target="_blank" >Download Data Format For Subscription Upload</a>
                            
                                    <input name="file" type="file" id="customFile" class="dropify" data-height="100" data-allowed-file-extensions="csv exe xlsx" />
                                    
                                </div>
                                <!-- field col  enc :: dropify-->
                                <!-- :: submit btn -->
                                <div class="form-group text-center mt-4">
                                    <button class="btn btn-primary bt-mb-100 w-50 " type="submit">
                                        <i class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Submit Subscription </button>
                                </div>
                                <!-- :: submit btn -->
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <div class="tile">
                        <div class="tile-body">
                            <!-- upload subscription form start from here -->
                            
                            <form class="upload_subscription_details"  action="{{ route('plan-import') }}" method="POST" enctype="multipart/form-data">
                                    @csrf
                                <!-- field col  start :: dropify-->
                                <div class="form-group">
                                    <label class="form-head mb-2" for="exampletext"> Upload Plan File </label>
                                    <a type="button" class="float-right m-auto btn btn-danger btn-sm  mb-3 op-btn them" href="{{ asset('assets/excel-formate-files/plan.xlsx')}}"target="_blank" >Download Data Format For Subscription Plan Upload</a>
                            
                                    <input name="file" type="file" id="customFile" class="dropify" data-height="100" data-allowed-file-extensions="csv exe xlsx" />
                                    
                                </div>
                                <!-- field col  enc :: dropify-->
                                <!-- :: submit btn -->
                                <div class="form-group text-center mt-4">
                                    <button class="btn btn-primary bt-mb-100 w-50 " type="submit">
                                        <i class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Submit Plan</button>
                                </div>
                                <!-- :: submit btn -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- upload subscription ends here -->

        @if($message = Session::get('success_add'))
           <div class="alert alert-success alert-dismissible fade show w-100" role="alert">
             <strong>Success!</strong> {{ $message }}
             <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
       @endif

       @if($message = Session::get('error_add'))
            <div class="alert alert-danger alert-dismissible fade show w-100" role="alert">
             <strong>Error!</strong> {{ $message }}
             <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
       @endif
        <!-- upload manager log section -->
        <section class="upload_manage_-log">
            <div class="row">
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div class="tile">
                        <div class="tile-body">
                            <div class="table-responsive">
                                <!-- data download button (.csv) -->
                                <a class="btn btn-info mb-2" id="downloadButton_" href="{{ route('subscription-export') }}">
                                    <i class="fa fa-download mb-1" aria-hidden="true"></i>Download </a>
                                
                                <a class="btn btn-danger mb-2" id="bulk-delete-btn"  href="">
                                    Delete</a>
                                    
                                <!-- data download buton end (.csv) -->
                                <!-- table start -->
                                <table class="table table-hover table-bordered" id="sampleTable">
                                    <!-- table head -->
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Sr.No</th>
                                            <th>Subscription Name</th>
                                            <th>Most Popular</th>
                                            <th>New Release</th>
                                            <th>Explore</th>
                                            <th>Gift Subscription</th>
                                            <!--<th>Logo URL</th>-->
                                            <!-- <th>Premium Subscriptions From</th>
                                            <th>Free Trial</th> -->
                                            <!--<th>Category</th>-->
                                            <th>Subscription Id</th>
                                            <th style="width: 150px;">Action</th>
                                        </tr>
                                    </thead>
                                    <!-- end table head -->
                                    <!-- table body start -->
                                    <tbody>
                      @if(count($subscriptions) > 0)
                         @php
                              $sno = 1;
                         @endphp
                         @foreach($subscriptions as $subscription)
                             @php  $subsid = Crypt::encrypt($subscription->id);  @endphp
                          <tr>
                            <td><div class="form-check">
                                  <input class="form-check-input row-checkbox" type="checkbox" value="<?=$subscription->id?>" id="checkbox<?=$subscription->id?>">
                                  <label class="form-check-label" for="flexCheckDefault">
                                  </label>
                                </div>
                            </td>
                            <td>{{$sno}}</td>
                            <td>{{$subscription->subscriptionName}}</td>
                            <td><span  data-id="{{$subscription->id}}"  data-sort="mostpopular" class="toggle-class-sort">@if($subscription->mostpopular_status == 'active')<i id="star_mostpopular_@php echo $subscription->id @endphp" class="fa fa-star star_active">@else <i id="star_mostpopular_@php echo $subscription->id @endphp" class="fa fa-star" @endif</i></span></td>
                            <td><span data-id="{{$subscription->id}}" data-status="{{$subscription->newrelease_status}}" data-sort="newrelease" class="toggle-class-sort">@if($subscription->newrelease_status == 'active')<i id="star_newrelease_@php echo $subscription->id @endphp"  class="fa fa-star star_active">@else <i id="star_newrelease_@php echo $subscription->id @endphp"  class="fa fa-star" @endif</i></span></td>
                            <td><span  data-id="{{$subscription->id}}" data-status="{{$subscription->explore_status}}" data-sort="explore" class="toggle-class-sort">@if($subscription->explore_status == 'active')<i id="star_explore_@php echo $subscription->id @endphp" class="fa fa-star star_active">@else <i id="star_explore_@php echo $subscription->id @endphp" class="fa fa-star" @endif</i></span></td>
                            <td><span  data-id="{{$subscription->id}}" data-status="{{$subscription->giftsubscription_status}}" data-sort="giftsubscription" class="toggle-class-sort">@if($subscription->giftsubscription_status == 'active')<i id="star_giftsubscription_@php echo $subscription->id @endphp" class="fa fa-star star_active">@else <i id="star_giftsubscription_@php echo $subscription->id @endphp" class="fa fa-star" @endif</i></span></td>
                            <!--<td>{{$subscription->logoURL}}</td>-->
                            <!-- <td>{{$subscription->premiumSubscriptionsFrom}}</td>
                            <td>{{$subscription->freeTrial}}</td> -->
                            <!--<td>{{$subscription->category}}</td>-->
                            <td>{{$subscription->subscriptionId}}</td>
                       
                            <td class="">
                                <span>
                                    <div class="dropdown show">
                                        <a class="action-btn dropdown-toggle" href="#" role="button"
                                            id="dropdownMenuLink" data-toggle="dropdown"
                                            aria-haspopup="false" aria-expanded="false">
                                            <img class="w-10px action-btn"
                                                src="{{ URL::asset('assets/img/action-btn.png') }}">
                                        </a>
                                        <div class="dropdown-menu " id="action-ed-d-btn"
                                            aria-labelledby="dropdownMenuLink">
                                            <a class="dropdown-item act-btn " href="{{ route('subscription-edit', $subsid )}}">
                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" class="delet-btn  act-btn demoSwal" id="demoSwal" data-id="{{$subscription->id}}" data-uri="delete-subscription">
                                                <i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    
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
        <script type="text/javascript" src="assets/js/plugins/subdefy_dropify.min.js"></script>
        <script>
            $('.dropify').dropify();
        </script>
       <script>
        $(document).ready(function() {
            $('#bulk-delete-btn').click(function() {
                event.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
        
                let selectedIds = [];
    
                $('input[type="checkbox"].row-checkbox:checked').each(function() {
                    selectedIds.push($(this).val()); // Assuming checkbox values are row IDs
                });
    
                if (selectedIds.length > 0) {
                    $.ajax({
                        method: 'POST',
                        url: '{{ route("items.bulk-delete") }}',
                        data: { selectedIds: selectedIds },
                        success: function(response) {
                            $('input[type="checkbox"].row-checkbox').prop('checked', false);
                            alert("Selected data deleted susscessfully");
                            setTimeout(function() {
                                 window.location.reload(); 
                            }, 100); 
                           
                            // Handle success (e.g., update DataTable, show success message)
                        },
                        error: function(xhr, status, error) {
                            // Handle error (e.g., show error message)
                        }
                    });
                }else{
                    alert("Please select data to delete");
                }
            });
        });
      </script>
        
    <script type="text/javascript">
      $('#sampleTable').DataTable();
      
       $("#sampleTable").on("click", ".demoSwal", function(){

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
<script>
  
   $("#sampleTable").on("click", ".toggle-class-sort", function(){

    var subs_id = jQuery(this).attr('data-id');
    var sort = jQuery(this).attr('data-sort');
     
        $.ajax({

            type: "GET",

            dataType: "json",

            url: '{{ route('changeSortStatus') }}',

            data: {'subs_id': subs_id, 'sort': sort},

            success: function(data){
            
              $('#star_'+sort+'_'+subs_id).toggleClass("star_active");
              console.log(data.success)

            }

        });

  })

  </script>
@endsection