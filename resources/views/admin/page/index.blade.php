@extends('admin.layouts.header')

@section('content')

<main class="app-content">
    <div class="app-title">
        <div>
            <h1><i class="fa fa-pencil-square mx-1"></i> Create And Manage Page</h1>
        </div>
    </div>
     @if($message = Session::get('success_add'))
         <div class="alert alert-success alert-dismissible fade show w-100" role="alert">
           <strong>Success!</strong> {{ $message }}
           <button type="button" class="close" data-dismiss="alert" aria-label="Close" >
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
     @endif
    <section class="Addpageform">
            <div class="tile">
                <div class="tile-body">
                    <div class=" cst-add-new-form row">

                        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                            <form class="Add-page-form w-auto " method="POST" action="{{route('page-store')}}">
                              @csrf
                              
                              <div class="form-group">
                                  <label class="form-head">Page Title</label>
                                  <input class="form-control  @error('page_name') is-invalid @enderror" name="page_name" value="{{ old('page_name') }}" id="page_name" type="text"  placeholder="Enter Page Title">
                                  
                                  @error('page_name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                  @enderror
                              </div>
                              <div class="form-group">
                                  <label class="form-head">Page Description</label>
                                  <textarea id="myTextarea" class="@error('content') is-invalid @enderror" name="content" >{{ old('content') }}</textarea>
                                        @error('content')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                         @enderror
                              </div>
                               @error('content')
                                    <p style="color:#dc3545; font-size: 80%;" ><strong>{{ $message }}</strong></p>
                                @enderror
                              <div class="form-group text-center">
                                <button type="submit" class="btn btn-info mt-2 w-50" id="demoNotify"><i
                                            class="fa-solid fa-paper-plane mx-2"></i>Submit</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </section>
   
   <section class="add_page_log">
      <div class="row">
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

         <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="tile">
               <div class="tile-body">
                  <div class="table-responsive">                               
                    <table class="table table-hover table-bordered" id="sampleTable">
                        <thead>
                           <tr>
                              <th>Sr.No</th>
                              <th>Page Title</th>
                              <th>Update</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                         @if(count($pages) > 0)
                           @php
                                $sno = 1;
                           @endphp
                           @foreach($pages as $page)
                           <tr>
                             @php  $pageid = Crypt::encrypt($page->id);  @endphp
                              <td>{{$sno}}</td>
                              <td>{{$page->page_name}}</td>
                              @php
                                  if(empty($newsletter->updated_at)){
                                    $old_date_timestamp = strtotime($page->created_at);
                                    $new_date = date('d-m-Y', $old_date_timestamp);
                                  }else{
                                    $old_date_timestamp = strtotime($page->updated_at);
                                    $new_date = date('d-m-Y', $old_date_timestamp);
                                  }
                                    
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
                                                <a class="dropdown-item act-btn " href="{{ route('page-edit', $pageid )}}">
                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" class="delet-btn  act-btn demoSwal" id="demoSwal" data-id="{{$page->id}}" data-uri="delete-page">
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
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
<!-- main content end  -->

 
@endsection
@section('scripts') 
<script src="{{ URL::asset('assets/js/plugins/pace.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/jquery.dataTables.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/dataTables.bootstrap.min.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/sweetalert.min.js') }}"></script>
<script src="https://cdn.tiny.cloud/1/l0xp8n0asjxeoofeo9h30icll510jblob20r38r92ecoyw00/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<script>



tinymce.init({
  selector: 'textarea#myTextarea',
  plugins: 'image code',
  toolbar: 'undo redo | link image | code',
  /* enable title field in the Image dialog*/
  image_title: true,
  /* enable automatic uploads of images represented by blob or data URIs*/
  automatic_uploads: true,
  /*
    URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: 'postAcceptor.php',
    here we add custom filepicker only to Image dialog
  */
  file_picker_types: 'image',
  /* and here's our custom image picker*/
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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

@endsection
