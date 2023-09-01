<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;

class AuthController extends Controller
{
    
    public function createUser(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6,',
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'user_id' => uniqid(),
                'password' => Hash::make($request->password),
            ]);

            
            $user = User::where('email', $request->email)->first();
            if($user){

                return response()->json([
                    'status' => true,
                    'message' => 'User Registered Successfully',
                    'user' => $user,
                    'token' => $user->createToken("API TOKEN")->plainTextToken
                ], 200);
               
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required',
                'password' => 'required',
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 

            $user = Auth::user(); 

            return response()->json([
                'status' => true,
                'message' => 'User Login Successfully',
                'user' => $user,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid login details',
                ], 401);
            }

        
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function sso(Request $request)
    {

        if(empty($request->name) || empty($request->email) || empty($request->provider)){
            return response()->json([
                'status' => false,
                'message' => 'All fields required!',
            ], 400);

        }

        $user1 = User::where('email', $request->email)->first();
        if($user1){
            $user_id = $user1->user_id; 
            
            $data = array(
                'provider' => $request->provider,
            );
            
            User::where('user_id',$user_id)->update($data);
            
        }else{
            $user1 = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'provider' => $request->provider,
                'user_id' => uniqid(),
                'password' => Hash::make(rand(1234, 9999))
            ]);
            
            $user1 = User::where('email', $request->email)->first();
            $user_id = $user1->user_id;
        }
             
        $ip = '';
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {  
                $ip = $_SERVER['HTTP_CLIENT_IP'];  
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
                    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];  
        } else{  
                 $ip = $_SERVER['REMOTE_ADDR'];  
        }  

        $new_arr = array(
            'ip' => $ip,
        );

        User::where('user_id', $user_id)->update($new_arr);

        $user2 = User::where('user_id', $user_id)->first();

        if($user2){

            return response()->json([
                'status' => true,
                'message' => 'User Login Successfully',
                'user' => $user2,
                'token' => $user2->createToken("API TOKEN")->plainTextToken
            ], 200);
           
        }

        return response()->json([
                'status' => false,
                'message' => 'Something wrong, please try again'
            ], 400);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    
   

}
