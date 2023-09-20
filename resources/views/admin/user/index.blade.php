@extends('admin.layouts.header')

@section('content')

<main class="app-content">
    <div class="app-title">
        <div>
            <h1>
                <i class="fa fa-user"></i> User Manager Logs
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

   <div class="row">
      <div class="col-md-12">
         <div class="tile">
            <div class="tile-body">
               <div class="table-responsive">
                  <table class="table table-hover table-bordered" id="sampleTable">
                     <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <!--<th>Subscription Id</th>-->
                            <th>Date Created</th>
                            <th>Last Active Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                      @if(count($users) > 0)
                        @php
                             $sno = 1;
                        @endphp
                        @foreach($users as $user)
                        <tr>
                           <td>{{$sno}}</td>
                           <td>{{$user->name}}</td>
                           <td>{{$user->email}}</td>
                           <!--<td>{{$user->mobile}}</td>-->
                           @php
                              $old_date_timestamp = strtotime($user->created_at);
                              $new_date = date('d-m-Y', $old_date_timestamp);  
                            @endphp
                            <td>{{$new_date}}</td>
                             <td>{{ $user->last_activity_at }}</td>
                            
                           <td class="">
                             <div class="toggle">
                                <label>
                                   <!-- <input type="checkbox"> -->
                                   <input data-id="{{$user->id}}" class="toggle-class" type="checkbox" @php if($user->status == 'active'){ echo 'checked'; }  @endphp>
                                   <span class="button-indecator"></span>
                                </label>
                             </div>
                           </td>
                           <td class="">
                              <a href="#" class="delet-btn demoSwal" id="demoSwal" data-id="{{$user->id}}" data-uri="delete-user">
                                 <i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
                              </a>
                           </td>

                        </tr>
                      @php
                          $sno++;
                        @endphp
                       @endforeach
                      @endif
                        
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </div>
</main>
<!-- main content end  -->

@endsection
@section('scripts') 


<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/jquery.dataTables.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/dataTables.bootstrap.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/sweetalert.min.js') }}"></script>
        
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
      

 $("#sampleTable").on("click", ".toggle-class", function(){

    var status = $(this).prop('checked') == true ? 1 : 0; 
    var user_id = jQuery(this).attr('data-id');


        $.ajax({

            type: "GET",

            dataType: "json",

            url: "{{route('changeuserStatus')}}",

            data: {'status': status, 'user_id': user_id},

            success: function(data){

              console.log(data.success)

            }

        });

  })

</script>



@endsection