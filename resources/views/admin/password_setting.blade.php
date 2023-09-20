@extends('admin.layouts.header')

@section('content')
 <main class="app-content">
    <div class="app-title">
        <div>
            <h1>
                <i class="fa fa-refresh mx-1"></i> Update Your Password 
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

    <!-- setting page content -->
    <section class="setting-reset-form">
        <!-- setting form start form here -->
        <div class="row setting-row">
            <div class=" w-100 text-center">
                <h1>Update Password</h1>
            </div>
            <br>
            <form class="setting-form w-100 mt-3" method="POST" action="{{route('password-setting-store')}}">
                              @csrf
                <div class="form-group">
                    <label class="form-head" for="password">Password</label>
                    <input class="form-control  @error('password') is-invalid @enderror" id="password" name="password"  value="{{ old('password') }}" type="password"  aria-describedby="password"
                        placeholder="Enter Password">
                              
                          @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                          @enderror
                </div>
                <div class="form-group">
                    <label class="form-head" for="confirmpassword"> Confirm Password</label>
                    
                    <input class="form-control mt-2 @error('confirm_password') is-invalid @enderror" name="password_confirmation" id="password_confirmation" type="password"   aria-describedby="password" placeholder="Enter Confirm Password">
                                  
                          @error('password_confirmation')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                          @enderror
                </div>
                <!-- submit button -->
                <div class="form-group text-center mt-4">
                    <button class="btn btn-primary bt-mb-100 w-50 " type="submit"><i
                            class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>Reset Password</button>
                </div>
            </form>
        </div>
    </section>
</main>
@endsection
@section('scripts') 
@endsection