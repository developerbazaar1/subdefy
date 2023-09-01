@extends('admin.layouts.header')

@section('content')
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1><i class="fa fa-Subscription"></i> Edit Subscription</h1>
            </div>
            <ul class="app-breadcrumb breadcrumb">
              <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
              <li class="breadcrumb-item"><a href="{{ route('subscription') }}">Subscriptions</a></li>
            </ul>
        </div>

        
        <!-- inner section start -->

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

        <section class="Subscription-form">
            <!-- tile inner space -->
            <div class="tile">
                <div class="tile-body">
                    <div id="app_content" class="app-container">
                        <!-- add Subscription form start-->
                        
                        <form class="w-100" id="addSubscription-form" method="POST" action="{{route('subscription-update')}}" enctype="multipart/form-data">
                          @csrf
                            <!-- form row start at lower div -->
                            <div class=" cst-add-new-form row m-3">
                                <!-- field col  start -->
                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                            Subscription Title
                                        </label>
                                        <input class="form-control  @error('subscriptionName') is-invalid @enderror" name="subscriptionName" id="subscriptionName" type="text" value="@if(!empty($subscription->subscriptionName)){{old('subscriptionName', $subscription->subscriptionName)}}@endif" placeholder="Enter Subscription subscriptionName"> 
                              
                                          @error('subscriptionName')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                            Logo URL
                                        </label>
                                        <input class="form-control  @error('logoURL') is-invalid @enderror" name="logoURL" id="logoURL" type="text" value="@if(!empty($subscription->logoURL)){{old('logoURL', $subscription->logoURL)}}@endif" placeholder="Enter logo URL"> 

                                          @error('logoURL')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Subscription Description Short
                                        </label>
                                        <input class="form-control  @error('subscriptionDescriptionShort') is-invalid @enderror" name="subscriptionDescriptionShort" id="subscriptionDescriptionShort" type="text" value="@if(!empty($subscription->subscriptionDescriptionShort)){{old('subscriptionDescriptionShort', $subscription->subscriptionDescriptionShort)}}@endif" placeholder="Enter Subscription Description Short"> 

                                          @error('subscriptionDescriptionShort')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Subscription Description Long
                                        </label>
                                        <input class="form-control  @error('subscriptionDescriptionLong') is-invalid @enderror" name="subscriptionDescriptionLong" id="subscriptionDescriptionLong" type="text" value="@if(!empty($subscription->subscriptionDescriptionLong)){{old('subscriptionDescriptionLong', $subscription->subscriptionDescriptionLong)}}@endif" placeholder="Enter Subscription Description Long"> 

                                          @error('subscriptionDescriptionLong')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Premium Subscriptions From
                                        </label>
                                        <input class="form-control  @error('premiumSubscriptionsFrom') is-invalid @enderror" name="premiumSubscriptionsFrom" id="premiumSubscriptionsFrom" type="text" value="@if(!empty($subscription->premiumSubscriptionsFrom)){{old('premiumSubscriptionsFrom', $subscription->premiumSubscriptionsFrom)}}@endif" placeholder="Enter Premium Subscriptions From"> 

                                          @error('premiumSubscriptionsFrom')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Cancel Url
                                        </label>
                                        <input class="form-control  @error('cancelUrl') is-invalid @enderror" name="cancelUrl" id="cancelUrl" type="text" value="@if(!empty($subscription->cancelUrl)){{old('cancelUrl', $subscription->cancelUrl)}}@endif" placeholder="Enter Cancel Url"> 

                                          @error('cancelUrl')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Cancel Email
                                        </label>
                                        <input class="form-control  @error('cancelEmail') is-invalid @enderror" name="cancelEmail" id="cancelEmail" type="text" value="@if(!empty($subscription->cancelEmail)){{old('cancelEmail', $subscription->cancelEmail)}}@endif" placeholder="Enter Cancel Email"> 

                                          @error('cancelEmail')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Cancel Phone
                                        </label>
                                        <input class="form-control  @error('cancelPhone') is-invalid @enderror" name="cancelPhone" id="cancelPhone" type="text" value="@if(!empty($subscription->cancelPhone)){{old('cancelPhone', $subscription->cancelPhone)}}@endif" placeholder="Enter Cancel Phone"> 

                                          @error('cancelPhone')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Manage Url
                                        </label>
                                        <input class="form-control  @error('manageUrl') is-invalid @enderror" name="manageUrl" id="manageUrl" type="text" value="@if(!empty($subscription->manageUrl)){{old('manageUrl', $subscription->manageUrl)}}@endif" placeholder="Enter Manage Url"> 

                                          @error('manageUrl')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Desktop
                                        </label>
                                        <input class="form-control  @error('desktop') is-invalid @enderror" name="desktop" id="desktop" type="text" value="@if(!empty($subscription->desktop)){{old('desktop', $subscription->desktop)}}@endif" placeholder="Enter Manage Url"> 

                                          @error('desktop')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Mobile App
                                        </label>
                                        <input class="form-control  @error('mobile_app') is-invalid @enderror" name="mobile_app" id="mobile_app" type="text" value="@if(!empty($subscription->mobile_app)){{old('mobile_app', $subscription->mobile_app)}}@endif" placeholder="Enter Manage Url"> 

                                          @error('mobile_app')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Email
                                        </label>
                                        <input class="form-control  @error('email') is-invalid @enderror" name="email" id="email" type="text" value="@if(!empty($subscription->email)){{old('email', $subscription->email)}}@endif" placeholder="Enter Manage Url"> 

                                          @error('email')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Phone Call
                                        </label>
                                        <input class="form-control  @error('phone_call') is-invalid @enderror" name="phone_call" id="phone_call" type="text" value="@if(!empty($subscription->phone_call)){{old('phone_call', $subscription->phone_call)}}@endif" placeholder="Enter Manage Url"> 

                                          @error('phone_call')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Free Trial
                                        </label>
                                        <input class="form-control  @error('freeTrial') is-invalid @enderror" name="freeTrial" id="freeTrial" type="text" value="@if(!empty($subscription->freeTrial)){{old('freeTrial', $subscription->freeTrial)}}@endif" placeholder="Enter Free Trial"> 

                                          @error('freeTrial')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Category
                                        </label>
                                        <input class="form-control  @error('category') is-invalid @enderror" name="category" id="category" type="text" value="@if(!empty($subscription->category)){{old('category', $subscription->category)}}@endif" placeholder="Enter Category"> 

                                          @error('category')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Sub Category
                                        </label>
                                        <input class="form-control  @error('subCategory') is-invalid @enderror" name="subCategory" id="subCategory" type="text" value="@if(!empty($subscription->subCategory)){{old('subCategory', $subscription->subCategory)}}@endif" placeholder="Enter Sub Category"> 

                                          @error('subCategory')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Related Terms
                                        </label>
                                        <input class="form-control  @error('relatedTerms') is-invalid @enderror" name="relatedTerms" id="relatedTerms" type="text" value="@if(!empty($subscription->relatedTerms)){{old('relatedTerms', $subscription->relatedTerms)}}@endif" placeholder="Enter Related Terms"> 

                                          @error('relatedTerms')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Company Name
                                        </label>
                                        <input class="form-control  @error('companyName') is-invalid @enderror" name="companyName" id="companyName" type="text" value="@if(!empty($subscription->companyName)){{old('companyName', $subscription->companyName)}}@endif" placeholder="Enter Company Name"> 

                                          @error('companyName')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Subscription Id
                                        </label>
                                        <input class="form-control  @error('subscriptionId') is-invalid @enderror" name="subscriptionId" id="subscriptionId" type="text" value="@if(!empty($subscription->subscriptionId)){{old('subscriptionId', $subscription->subscriptionId)}}@endif" placeholder="Enter Subscription Id"> 

                                          @error('subscriptionId')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                          Affiliate Program
                                        </label>
                                        <input class="form-control  @error('affiliateProgram') is-invalid @enderror" name="affiliateProgram" id="affiliateProgram" type="text" value="@if(!empty($subscription->affiliateProgram)){{old('affiliateProgram', $subscription->affiliateProgram)}}@endif" placeholder="Enter Affiliate Program"> 

                                          @error('affiliateProgram')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                         SignUp Url
                                        </label>
                                        <input class="form-control  @error('signUpUrl') is-invalid @enderror" name="signUpUrl" id="signUpUrl" type="text" value="@if(!empty($subscription->signUpUrl)){{old('signUpUrl', $subscription->signUpUrl)}}@endif" placeholder="Enter SignUp Url"> 

                                          @error('signUpUrl')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                         Banner Image
                                        </label>
                                        <input class="form-control  @error('banner_image') is-invalid @enderror" name="banner_image" id="banner_image" type="text" value="@if(!empty($subscription->banner_image)){{old('banner_image', $subscription->banner_image)}}@endif" placeholder="Enter Banner Image Url"> 

                                          @error('banner_image')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>


                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                         Gallery Images
                                        </label>
                                        <input class="form-control  @error('gallery_image') is-invalid @enderror" name="gallery_image" id="gallery_image" type="text" value="@if(!empty($subscription->gallery_image)){{old('gallery_image', $subscription->gallery_image)}}@endif" placeholder="Enter Gallery Image url"> 

                                          @error('gallery_image')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                         Rating
                                        </label>
                                        <input class="form-control  @error('rating') is-invalid @enderror" name="rating" id="rating" type="text" value="@if(!empty($subscription->rating)){{old('rating', $subscription->rating)}}@endif" placeholder="Enter Rating"> 

                                          @error('rating')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>
                                <!-- mce :: text editor  -->
                                
                                <!-- mce :: end text editor  -->
                            </div>
                            <input type="hidden" name="subid" value="{{$subscription->id}}">
                            <!-- :: submit button -->
                            <div class="form-group terms mt-2 mb-2">
                                <input type="submit" class="btn btn-info w-100" id=""></input>
                            </div>
                            <!-- :: end submit button -->
                        </form>
                        <!-- add Subscription form up end -->
                    </div>
                </div>
            </div>
            <!-- tile inner space up end -->
        </section>


         <section class="upload_manage_-log">
            
            <div class="row">
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div class="tile">
                        <div class="tile-body">
                            <div class="mb-5">
                                <h1>Subscription Plans List</h1>
                            </div>
                            <div class="table-responsive">
                                <!-- data download button (.csv) -->
                                <a class="btn btn-info mb-2" id="downloadButton">
                                    <i class="fa fa-download mb-1" aria-hidden="true"></i>Download </a>
                                <!-- data download buton end (.csv) -->
                                <!-- table start -->
                                <table class="table table-hover table-bordered" id="sampleTable">
                                    <!-- table head -->
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Subscription Name</th>
                                            <th>Region</th>
                                            <th>Plan Name</th>
                                            <th>Default Cost</th>
                                            <th>Default Billing Cycle</th>
                                            <th style="width: 150px;">Action</th>
                                        </tr>
                                    </thead>
                                    <!-- end table head -->
                                    <!-- table body start -->
                                    <tbody>
                      @if(count($plans) > 0)
                         @php
                              $sno = 1;
                         @endphp
                         @foreach($plans as $plan)
                             @php  $planid = Crypt::encrypt($plan->id);  @endphp
                          <tr>
                            <td>{{$sno}}</td>
                            <td>{{$plan->subscriptionName}}</td>
                            <td>{{$plan->region}}</td>
                            <td>{{$plan->planName}}</td>
                            <td>{{$plan->defaultCost}}</td>
                            <td>{{$plan->defaultBillingCycle}}</td>
                           
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
                                            <a class="dropdown-item act-btn " href="{{ route('plan-edit', $planid )}}">
                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" class="delet-btn  act-btn demoSwal" id="demoSwal" data-id="{{$plan->id}}" data-uri="delete-plan">
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

<script src="https://cdn.tiny.cloud/1/l0xp8n0asjxeoofeo9h30icll510jblob20r38r92ecoyw00/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<script>
  tinymce.init({
    selector: 'textarea#myTextarea'
  });
</script>

<!-- <script src="https://cdn.jsdelivr.net/npm/@tinymce/tinymce-webcomponent@2/dist/tinymce-webcomponent.min.js"></script> -->
<script src="{{ URL::asset('assets/js/plugins/jquery.dataTables.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/plugins/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/plugins/wooenglish_assets_js_dropify.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/sweetalert.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/plugins/pace.min.js') }}"></script>
<script>
    $('.dropify').dropify();
</script>
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