@extends('admin.layouts.header')

@section('content')
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1><i class="fa fa-refresh mx-1"></i> Update Your SMTP </h1>
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

        <section class="setsmtp">
            <div class="row justify-content-center">
                <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="tile">
                        <div class="tile-body">
                            <!-- smtp setting form start from here  -->
                            <form class="smtp_setting" id="smtp_setting_form" method="POST" action="{{route('smtp-setting-store')}}">
                                @csrf
                            
                                <!-- form row from here -->
                                <div class=" cst-add-new-form row">
                                    <!-- form input  start from here -->
                                    <!-- field 01 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="mailer-mail">Mail Mailer</label>
                                            <input class="form-control  @error('mail_mailer') is-invalid @enderror" name="mail_mailer" id="mail_mailer" type="text" value="@if(!empty($smtp->mail_mailer)){{old('mail_mailer', $smtp->mail_mailer)}}@endif" aria-describedby="mail" placeholder="Enter Mailer Mail"> 
                              
                                              @error('mail_mailer')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 02 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">Mail Host</label>
                                            <input class="form-control  @error('mail_host') is-invalid @enderror" name="mail_host" id="mail_host" type="text" value="@if(!empty($smtp->mail_host)){{old('mail_host', $smtp->mail_host)}}@endif" aria-describedby="host" placeholder="Enter Mail Host"> 
                              
                                              @error('mail_host')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 03 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">Mail Port</label>
                                            <input class="form-control  @error('mail_port') is-invalid @enderror" name="mail_port" id="mail_port" type="text" value="@if(!empty($smtp->mail_port)){{old('mail_port', $smtp->mail_port)}}@endif" aria-describedby="port" placeholder="Enter Mail Port"> 
                              
                                              @error('mail_port')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 04 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">Mail UserName</label>
                                            <input class="form-control  @error('mail_username') is-invalid @enderror" name="mail_username" id="mail_username" type="text" value="@if(!empty($smtp->mail_username)){{old('mail_username', $smtp->mail_username)}}@endif" aria-describedby="mail-user" placeholder="Enter Mail UserName"> 
                              
                                              @error('mail_username')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 05 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head mb-2" for="host-mail">Mail Password</label>
                                             <input class="form-control  @error('mail_password') is-invalid @enderror" name="mail_password" id="mail_password" type="text" value="@if(!empty($smtp->mail_password)){{old('mail_password', $smtp->mail_password)}}@endif" aria-describedby="password-m-user" placeholder="Enter Mail Password"> 
                              
                                              @error('mail_password')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 06 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">Mail Encryption</label>
                                            <input class="form-control  @error('mail_encryption') is-invalid @enderror" name="mail_encryption" id="mail_encryption" type="text" value="@if(!empty($smtp->mail_encryption)){{old('mail_encryption', $smtp->mail_encryption)}}@endif" aria-describedby="encryption-m-user"
                                                placeholder="Enter Mail Encryption"> 
                              
                                              @error('mail_encryption')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 07 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="host-mail">Mail From Address</label>
                                            <input class="form-control  @error('mail_from_address') is-invalid @enderror" name="mail_from_address" id="mail_from_address" type="text" value="@if(!empty($smtp->mail_from_address)){{old('mail_from_address', $smtp->mail_from_address)}}@endif" aria-describedby="from-m-address" placeholder="Enter Mail From Address"> 
                              
                                              @error('mail_from_address')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                    <!-- field 08 -->
                                    <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                                        <div class="form-group">
                                            <label class="form-head" for="from-name">Mail From Name</label>
                                            <input class="form-control  @error('mail_from_name') is-invalid @enderror" name="mail_from_name" id="mail_from_name" type="text" value="@if(!empty($smtp->mail_from_name)){{old('mail_from_name', $smtp->mail_from_name)}}@endif" aria-describedby="mail-from-name"
                                                placeholder="Enter Mail From Name"> 
                              
                                              @error('mail_from_name')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                              @enderror
                                        </div>
                                    </div>
                                </div>

                                @if(!empty($smtp->id))
                                <input type="hidden" name="smtpid" value="{{ $smtp->id }}" >
                                @endif
                                <!-- :: submit button -->
                                <div class="form-group text-center mt-4">
                                    <button class="btn btn-primary bt-mb-100 w-50 " id="" type="submit"><i
                                        class="fa fa-paper-plane mx-2 mb-1" aria-hidden="true"></i>
                                        Update Setting
                                    </button>
                                </div>
                                <!-- :: submit button -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection
@section('scripts') 
@endsection