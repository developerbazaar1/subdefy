@extends('admin.layouts.header')

@section('content')


<main class="app-content">
  <div class="app-title">
    <div>
      <h1>
        <i class="fa fa-envelope"></i> View Blogs
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

  <!-- view blog  log section -->
  <section class="view-blog-log">
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
                <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Thumbnail</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Preview Blog</th>
                      <th>Publish Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                <tbody>
                  @if(count($blogs) > 0)
                     @php
                          $sno = 1;
                     @endphp
                     @foreach($blogs as $blog)

                      <tr>
                         @php  $blogid = Crypt::encrypt($blog->id);  @endphp
                        <td>{{$sno}}</td>
                        <td class="w-10">
                          <div class="image">
                            <!-- {{ URL::asset('/public/'.$blog->blog_thumbnail) }} -->
                            <img class=" rounded cst-wdh" src="{{ URL::asset('/public/'.$blog->blog_thumbnail) }}" width="100px" alt="">
                          </div>
                        </td>
                        <td>{{$blog->blog_title}}</td>
                        <td>{{$blog->blog_category}}</td>
                        <td class="">
                         <div class="toggle">
                            <label>
                               <!-- <input type="checkbox"> -->
                               <input data-id="{{$blog->id}}" class="toggle-class" type="checkbox" @php if($blog->status == 'active'){ echo 'checked'; }  @endphp>
                               <span class="button-indecator"></span>
                            </label>
                         </div>
                        </td>
                        <td>Preview</td>
                        @php
                          $old_date_timestamp = strtotime($blog->created_at);
                          $new_date = date('d-m-Y', $old_date_timestamp);  
                        @endphp
                        <td>{{$new_date}}</td>
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
                                                <a class="dropdown-item act-btn " href="{{ route('blog-edit', $blogid )}}">
                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" class="delet-btn  act-btn demoSwal" id="demoSwal" data-id="{{$blog->id}}" data-uri="delete-blog">
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


  <script>
  
  
   $("#sampleTable").on("click", ".toggle-class", function(){

    var status = $(this).prop('checked') == true ? 1 : 0; 
    var blog_id = jQuery(this).attr('data-id');
    
//   $(function() {

//     $('.toggle-class').change(function() {

//         var status = $(this).prop('checked') == true ? 1 : 0; 

//         var blog_id = $(this).data('id'); 

        $.ajax({

            type: "GET",

            dataType: "json",

            url: '{{ route('changeBlogStatus') }}',

            data: {'status': status, 'blog_id': blog_id},

            success: function(data){

              console.log(data.success)

            }

        });

    // })

  })

  </script>

@endsection