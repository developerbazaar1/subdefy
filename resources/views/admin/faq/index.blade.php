@extends('admin.layouts.header')

@section('content')

<main class="app-content">
    <div class="app-title">
        <div>
            <h1>
                <i class="fa fa-question-circle"></i> Add And Manage FAQ'S
            </h1>
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

    <section class="faq-upload">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="tile">
                    <div class="tile-body">
                        <!-- form start from here -->
                        <form class="manage-faq" method="POST" action="{{route('faq-store')}}">
                              @csrf
                            <!-- form input start from here -->
                            <!-- input 1 -->
                             <div class="form-group">
                                  <label class="form-head">Question</label>
                                  <input class="form-control  @error('question') is-invalid @enderror" name="question" value="{{ old('question') }}" id="question" type="text"  placeholder="Enter Question">
                                  
                                  @error('question')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                  @enderror
                              </div>
                              
                              <div class="form-group">
                                  <label class="form-head">Answer</label>
                                  <textarea class="@error('answer') is-invalid @enderror form-control" placeholder="Enter Your Answer" id="exampleTextarea" rows="5" name="answer" >{{ old('answer') }}</textarea>
                                        @error('answer')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                         @enderror
                              </div>
                               
                              
                            <!-- :: submit button -->
                            <div class="form-group text-center mt-4">
                                <button  class="btn btn-primary bt-mb-100 w-50 " id="" type="submit">
                                    <i class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i> Submit </button>
                            </div>
                            <!-- :: submit button -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

   
   
   <section class="viewFaq">
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

         <div class="col-md-12">
            <div class="tile">
               <div class="tile-body">
                  <div class="table-responsive">
                     <table class="table table-hover table-bordered" id="sampleTable">
                        <thead>
                           <tr>
                              <th>Sr.No</th>
                              <th>Question</th>
                              <th>Answer</th>
                              <th>Delete</th>
                           </tr>
                        </thead>
                        <tbody>
                         @if(count($faqs) > 0)
                           @php
                                $sno = 1;
                           @endphp
                           @foreach($faqs as $faq)
                           <tr>
                             @php  $Faqid = Crypt::encrypt($faq->id);  @endphp
                              <td>{{$sno}}</td>
                              <td  id="ques<?=$faq->id?>">{{$faq->question}}</td>
                              <td  id="anws<?=$faq->id?>">{{$faq->answer}}</td>
                              <td class="">
                                <span>
                                    <div class="dropdown show">
                                        <a class="action-btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                            <img class="w-10px action-btn" src="assets/img/action-btn.png">
                                        </a>
                                        <div class="dropdown-menu " id="action-ed-d-btn" aria-labelledby="dropdownMenuLink">
                                            <a class="dropdown-item act-btn type="button" data-toggle="modal" data-target="#exampleModalLong<?=$faq->id ?>"  href="#" id="edit-btn">
                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" class="dropdown-item delet-btn act-btn demoSwal" id="demoSwal" data-id="{{$faq->id}}" data-uri="delete-faq">
                                                <i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <!-- <a class="action-btn " href="" ><img class="w-10px action-btn" src="assets/img/action-btn.png"></a> -->
                                    <!-- <a href="#" class="delet-btn" id="demoSwal"><i class=" fa fa-trash-o dlt-icon" aria-hidden="true"></i></a> -->
                                </span>
                              </td>


       <div class="modal fade" id="exampleModalLong<?=$faq->id ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLongTitle">
                     <i class="fa fa-pencil px-2" aria-hidden="true"></i>Edit
                  </h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="modal-heading text-center">
                     <h1>FAQ</h1>
                  </div>
                  <form  id="edit-category-form" class="editcategory-form w-auto" >
             
                     <div class="form-group">
                        <label class="form-head">Question</label>
                        <input type="hidden" name="faq_id"  id="faq_id" value="{{$faq->id}}">
                        <input class="form-control" id="question<?=$faq->id?>" name="question" type="text" placeholder="question"  value="{{$faq->question}}">

                     </div>
                     <div class="form-group">
                            <label for="exampleTextarea">Answer</label>
                            <textarea class="form-control" id="answer<?=$faq->id?>" name="answer" placeholder="Enter Your Answer" rows="5">{{$faq->answer}}</textarea>
                      </div>
                  </form>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit"  data-cat-id="{{$faq->id}}" class="cat-submit btn btn-primary">Save changes</button>
               </div>
            </div>
         </div>
      </div>
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
    selector: 'textarea#myTextarea'
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
  


   $(".cat-submit").click(function(event){ 
        event.preventDefault();

        var faq_id = $(this).data('cat-id');
        var question = $('#question'+faq_id).val();
        var answer = $('#answer'+faq_id).val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({

            type: "POST",

            dataType: "json",

            url: "{{route('faq-update')}}",

            data: {'question': question, 'faq_id': faq_id, 'answer': answer},

            success: function(data){
               $('#exampleModalLong'+faq_id).modal('hide');
               $('#ques'+faq_id).html(question);
               $('#anws'+faq_id).html(answer);

            }

        });


  });
</script>

@endsection
