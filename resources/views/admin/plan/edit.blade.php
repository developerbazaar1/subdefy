@extends('admin.layouts.header')

@section('content')
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1><i class="fa fa-Subscription"></i> Edit Subscription Plan</h1>
            </div>
            <ul class="app-breadcrumb breadcrumb">
              <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
              <li class="breadcrumb-item"><a href="{{ route('plans') }}">Subscription Plan</a></li>
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
                        
                        <form class="w-100" id="addSubscription-form" method="POST" action="{{route('plan-update')}}" enctype="multipart/form-data">
                          @csrf
                            <!-- form row start at lower div -->
                            <div class=" cst-add-new-form row m-3">
                                <!-- field col  start -->
                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                            Subscription Title
                                        </label>
                                        <input class="form-control  @error('subscriptionName') is-invalid @enderror" name="subscriptionName" id="subscriptionName" type="text" value="@if(!empty($plan->subscriptionName)){{old('subscriptionName', $plan->subscriptionName)}}@endif" placeholder="Enter Subscription subscriptionName"> 
                              
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
                                            Region
                                        </label>
                                        <input class="form-control  @error('region') is-invalid @enderror" name="region" id="region" type="text" value="@if(!empty($plan->region)){{old('region', $plan->region)}}@endif" placeholder="Enter Region"> 

                                          @error('region')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Plan Name
                                        </label>
                                        <input class="form-control  @error('planName') is-invalid @enderror" name="planName" id="planName" type="text" value="@if(!empty($plan->planName)){{old('planName', $plan->planName)}}@endif" placeholder="Enter Plan Name"> 

                                          @error('planName')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Default Cost
                                        </label>
                                        <input class="form-control  @error('defaultCost') is-invalid @enderror" name="defaultCost" id="defaultCost" type="text" value="@if(!empty($plan->defaultCost)){{old('defaultCost', $plan->defaultCost)}}@endif" placeholder="Enter Default Cost"> 

                                          @error('defaultCost')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Default Billing Cycle
                                        </label>
                                        <input class="form-control  @error('defaultBillingCycle') is-invalid @enderror" name="defaultBillingCycle" id="defaultBillingCycle" type="text" value="@if(!empty($plan->defaultBillingCycle)){{old('defaultBillingCycle', $plan->defaultBillingCycle)}}@endif" placeholder="Enter Default Billing Cycle"> 

                                          @error('defaultBillingCycle')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Commitment
                                        </label>
                                        <input class="form-control  @error('commitment') is-invalid @enderror" name="commitment" id="commitment" type="text" value="@if(!empty($plan->commitment)){{old('commitment', $plan->commitment)}}@endif" placeholder="Enter Default Billing Cycle"> 

                                          @error('commitment')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <label class="form-head" for="exampletext">
                                           Subscription id
                                        </label>
                                        <input class="form-control  @error('subscription_id') is-invalid @enderror" name="subscription_id" id="subscription_id" type="text" value="@if(!empty($plan->subscription_id)){{old('subscription_id', $plan->subscription_id)}}@endif" placeholder="Enter Default Billing Cycle"> 

                                          @error('subscription_id')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                          @enderror
                                    </div>
                                </div>

                                
                                <!-- mce :: text editor  -->
                                
                                <!-- mce :: end text editor  -->
                            </div>
                            <input type="hidden" name="planid" value="{{$plan->id}}">
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
<script src="{{ URL::asset('assets/js/plugins/pace.min.js') }}"></script>
<script>
    $('.dropify').dropify();
</script>
@endsection