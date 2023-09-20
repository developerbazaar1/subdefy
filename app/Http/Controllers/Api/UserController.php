<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Favorite;
use App\Models\Newsletter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    
     public function get_user(Request $request)
    {   
        $user = User::where('id', Auth::user()->id )->first(); 
        
        if($user){
            
            return response()->json([
                'status' => true,
                'message' => 'Get user data successfully',
                'user' => $user,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'User not exist, please try again',
            ], 400);
        }
       
    }
    
    public function newsletter(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

           
            $newsletterData = Newsletter::create([
                'email' => $request->email,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Request sent successfully',
            ], 200);
           
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update_profile(Request $request)
    {

        if($request->file('document')){
             $image = $request->file('document'); 
            if($image->isValid()){
                if(!empty($request->input('document_old'))){
                    if(file_exists(public_path('/').'/'.$request->input('document_old'))){
                        unlink(public_path('/').'/'.$request->input('document_old')); 
                    }
                }
                $extension = $image->getClientOriginalExtension();
                $fileName = rand(100,999999).time().'.'.$extension;
                $image_path = public_path('upload/user');
                $request->document->move($image_path, $fileName);
                $formInput['document'] = 'upload/user/'.$fileName;
            }
            unset($formInput['document_old']);
        }else{
            $formInput['document'] = $request->input('document_old');
        }
        
       
        
        if(empty($request->name)){
            return response()->json([
                'status' => false,
                'message' => 'All fields required!',
            ], 400);

        }
        
       
        
        
        $data = array(
            "name"=>$request->input('name'),
            "user_image"=>$formInput['document'],
        );
        
       
            $userid = auth::user()->id;
            User::where('id',$userid)->update($data);
            $user = User::where('id',$userid)->first();
            return response()->json([
                    'status' => true,
                    'message' => 'Profile updated successfully',
                    'user' => $user,
                ], 200);
            
           
    }

     public function update_password(Request $request)
    {

        if(empty($request->password) || empty($request->old_password)){
            return response()->json([
                'status' => false,
                'message' => 'All fields required!',
            ], 400);

        }

        if($request->password){
            $validateUser = Validator::make($request->all(), 
            [
                 'password' => 'confirmed|min:6',
         
            ]);

            if($validateUser->fails()){ 
               
                return response()->json([
                    'status' => false,
                    'message' => 'Password does not match with confirm password!',
                ], 400);
            } 

        } 
        
        $userdetails = User::where('id',Auth::user()->id)->first();
        $oldhash_pass = Hash::make($request->input('old_password'));
        
         // Check if old password is correct
        if (!Hash::check($request->old_password, $userdetails->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 401);
        }
        
        $data = array(
            "password"=>Hash::make($request->input('password')),
        );
        
        User::where('id',Auth::user()->id)->update($data);
        return response()->json([
            'status' => true,
            'message' => 'User Password updated successfully',
        ], 200);
        
        
        
    
           
    }

    public function favorite(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'subscription_name' => 'required',
                'user_id' => 'required',
         
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $fav = Favorite::where('user_id', $request->user_id)->where('subscription_name', $request->subscription_name)->first();

            if($fav){
                $fav->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Favorite deleted successfully',

                ], 200);

            }else{

                $favoritedata = Favorite::create([
                    'subscription_name' => $request->subscription_name,
                    'user_id' => $request->user_id,
                   
                ]);

                
                return response()->json([
                    'status' => true,
                    'message' => 'favorite added successfully',
                    'favoritedata' => $favoritedata,
                ], 200);

            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    
     public function get_user_favorite_data(Request $request)
    {           
            if ($request->has('limit')) {
                $limit = $request->input('limit');
            }else{
                $limit = 5000;
            }
            
            if ($request->has('offset')) {
                $offset = $request->input('offset');
            }else{
                $offset = 0;
            }
            
         
            $favorites = Favorite::with('subscriptiondetails')->where('user_id',  Auth::user()->user_id)->orderBy('id','DESC')->skip($offset)->take($limit)->get();
            
            
            
            if($favorites){
                
                
                return response()->json([
                    'status' => true,
                    'message' => 'Get user favorite data successfully',
                    'subscriptions' => $favorites,
                 
                ], 200);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'No user favorite data available, please try again',
                ], 401);
            }
       
    }
    
    public function destroy_user_image(Request $request)
    {
        if ($request->has('user_id')) {
            $user_id = $request->input('user_id');
        }else{
		    return response()->json([
                'status' => false,
                'message' => 'User id required',
            ], 401);
		}
        
        $user = User::where('user_id', $user_id)->first();
		
		if(!empty($user->user_image)){
		    $image = "public/".$user->user_image;

			if(file_exists($image)){
				unlink($image);
			}
			
			$data = array(
                "user_image"=>null,
            );
            
            User::where('user_id', $user_id)->update($data);
            
			return response()->json([
                'status' => true,
                'message' => 'User image deleted successfully',
            ], 200);
        
		}else{
		    return response()->json([
                'status' => false,
                'message' => 'No user image exist',
            ], 401);
		}
        
        return response()->json([
            'status' => true,
            'message' => 'User image deleted successfully',
        ], 200);
    
    }
    
    public function download_pitch_request(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

           
            // $email_data = array(
            //     'email'  =>  $request->email,
            // );

            // Mail::send('download_pitch_email_template', $email_data, function ($message) use ($email_data) {
            //         $message->to('billing@clearstarttax.com', 'Team')
            //         ->subject('Download pitch request')
            //         ->from('billing@clearstarttax.com', 'Clear start tax');
            //         });

            return response()->json([
                'status' => true,
                'message' => 'Request sent successfully',
            ], 200);
           
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

   
}
