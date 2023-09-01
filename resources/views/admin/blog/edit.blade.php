@extends('admin.layouts.header')

@section('content')
<main class="app-content">
	<div class="app-title">
		<div>
			<h1>
				<i class="fa fa-pencil-square mx-1"></i> Add Blogs
			</h1>
			<!-- <p>Start a beautiful journey here</p> -->
		</div>
	</div>
	<!-- view blog button start from here -->
	<div class="row mb-3 ">
		<div class="col-md-12">
			<a href="{{ route('blogs') }}" class="btn-lg btn-primary float-right" id="">View Blog's</a>
		</div>
	</div>
	<!-- view blog button end here -->

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

	<!-- content start -->
	<section class="blog-update">
		<div class="row justify-content-center">
			<div class="col-md-12">
				<div class="tile">
					<div class="tile-body">
						
						<form class="blog-update-form" method="POST" action="{{route('blog-update')}}" enctype="multipart/form-data">
                          @csrf
							<!-- form row 01 start from here -->
							<div class=" cst-add-new-form row">
								<!-- form input  start from here -->
								<!-- field col  start :: dropify-->
								<div class="col-lg-4 col-sm-4 col-md-4 col-xs-12">
									
									<div class="form-group">
	                                    <label class="form-head  mb-2" for="exampletext">
	                                      Blog Thumbnails
	                                    </label>
	                                   <input name="document" type="file" data-default-file="{{ URL::asset('/public/'.$blog->blog_thumbnail) }}" class="dropify @error('document') is-invalid @enderror" data-height="100" data-allowed-file-extensions="jpeg jpg png"/>
	                                   @error('document')
	                                        <span class="invalid-feedback" role="alert">
	                                            <strong>{{ $message }}</strong>
	                                        </span>
	                                   @enderror
	                                </div>
	                                @error('document')
	                                    <p style="color:#dc3545; font-size: 80%;" ><strong>{{ $message }}</strong></p>
	                                @enderror


								</div>
								<!-- field col  enc :: dropify-->
								<!-- field 02 col start from here -->
								<div class="col-lg-8 col-sm-8 col-md-8 col-xs-12">
									<div class="form-group">
										<label class="form-head" for="mailer-mail"> Blog Title</label>
										<input class="form-control  @error('blog_title') is-invalid @enderror" name="blog_title" id="blog_title" value="@if(!empty($blog->blog_title)){{old('blog_title', $blog->blog_title)}}@endif" type="text"  aria-describedby="title" placeholder="Enter Your Blog Title">
                              
			                              @error('blog_title')
			                                    <span class="invalid-feedback" role="alert">
			                                        <strong>{{ $message }}</strong>
			                                    </span>
			                              @enderror
									</div>
									<!-- field 03 -->
									<div class="form-group">
										<label class="form-head" for="exampletext"> Blog Category </label>
										<div class="select-group h-40">
                                            <select name="blog_category" id="blog_category" class="form-control @error('blog_category') is-invalid @enderror">
                                               <option label="Select Category" ></option>
                                                @if(count($categories) > 0)
                                                   @foreach($categories as $category)
                                                     @if ($category->id ==  $blog->blog_category  )
                                                         <option value="{{ $category->id }}" selected>{{ $category->name }}</option>
                                                     @else
                                                         <option value="{{ $category->id }}" >{{$category->name}}</option>
                                                     @endif
                                                   @endforeach
                                                @endif
                                             </select>
                                             @error('blog_category')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                             @enderror
                                        </div>
									</div>
									<!-- field 04 -->
									<div class="form-group">
										<label class="form-head mb-2" for="mailer-mail"> Blog Short Description</label>
										<input class="form-control  @error('blog_short_desc') is-invalid @enderror" name="blog_short_desc" value="@if(!empty($blog->blog_short_desc)){{old('blog_short_desc', $blog->blog_short_desc)}}@endif" id="blog_short_desc" type="text"  aria-describedby="Blog Short Description" placeholder="Enter Your Blog Short Description">
                              
			                              @error('blog_short_desc')
			                                    <span class="invalid-feedback" role="alert">
			                                        <strong>{{ $message }}</strong>
			                                    </span>
			                              @enderror
									</div>
								</div>
							</div>
							<!-- :: row 02 for tiny mce edit  -->
							<div class=" cst-add-new-form row">
								<div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
									<div class="form-group">
										<label class="form-head mb-2" for="exampletext"> Blog Description </label>
										<textarea id="myTextarea" class="@error('blog_long_description') is-invalid @enderror" name="blog_long_description" >@if(!empty($blog->blog_long_description)){{old('blog_long_description', $blog->blog_long_description)}}@endif</textarea>
                                        @error('blog_long_description')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                         @enderror
									</div>
									@error('blog_long_description')
                                        <p style="color:#dc3545; font-size: 80%;" ><strong>{{ $message }}</strong></p>
                                    @enderror
								</div>
							</div>

							<input type="hidden" name="blogid" value="{{ $blog->id }}">
							<input type="hidden" name="document_old" value="{{$blog->blog_thumbnail}}">
							<!-- :: submit btn -->
							<div class="form-group text-center mt-4">
								<button class="btn btn-primary bt-mb-100 w-50 " type="submit">
									<i class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Submit Blog </button>
							</div>
							<!-- :: submit btn -->
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

@endsection
@section('scripts') 


<script src="{{ URL::asset('assets/js/plugins/tinymce-editor.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('assets/js/plugins/subdefy_dropify.min.js') }}"></script>
<script>
	$('.dropify').dropify();
</script>
<script src="https://cdn.tiny.cloud/1/l0xp8n0asjxeoofeo9h30icll510jblob20r38r92ecoyw00/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<script>

var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


tinymce.init({
    selector: 'textarea#myTextarea',
    images_upload_url: '{{route("upload-image")}}',
    plugins: 'image',
    toolbar: 'image',
    // images_upload_url: '/upload-image', // Laravel route to handle image upload
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
            var file = this.files[0];

            var formData = new FormData();
            formData.append('image', file);

            // Include the CSRF token in the formData
            formData.append('_token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload-image', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    cb(response.url, { alt: file.name });
                }
            };
            xhr.send(formData);
        };

        input.click();
    }
});
// tinymce.init({
//   selector: 'textarea#myTextarea',
//   images_upload_url: '{{route("upload-image")}}',
//   plugins: 'image code',
//   toolbar: 'undo redo | link image | code',
//   /* enable title field in the Image dialog*/
//   image_title: true,
//   /* enable automatic uploads of images represented by blob or data URIs*/
//   automatic_uploads: true,
//   /*
//     URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
//     images_upload_url: 'postAcceptor.php',
//     here we add custom filepicker only to Image dialog
//   */
//   file_picker_types: 'image',
//   /* and here's our custom image picker*/
//   file_picker_callback: function (cb, value, meta) {
//     var input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');

//     /*
//       Note: In modern browsers input[type="file"] is functional without
//       even adding it to the DOM, but that might not be the case in some older
//       or quirky browsers like IE, so you might want to add it to the DOM
//       just in case, and visually hide it. And do not forget do remove it
//       once you do not need it anymore.
//     */

//     input.onchange = function () {
//       var file = this.files[0];

//       var reader = new FileReader();
//       reader.onload = function () {
//         /*
//           Note: Now we need to register the blob in TinyMCEs image blob
//           registry. In the next release this part hopefully won't be
//           necessary, as we are looking to handle it internally.
//         */
//         var id = 'blobid' + (new Date()).getTime();
//         var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
//         var base64 = reader.result.split(',')[1];
//         var blobInfo = blobCache.create(id, file, base64);
//         blobCache.add(blobInfo);

//         /* call the callback and populate the Title field with the file name */
//         cb(blobInfo.blobUri(), { title: file.name });
//       };
//       reader.readAsDataURL(file);
//     };

//     input.click();
//   },
//   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
// });

</script>
@endsection