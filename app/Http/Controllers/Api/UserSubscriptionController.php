<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\UserSubscription;
use App\Models\Subscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserSubscriptionController extends Controller
{
    

    public function get_usersubscriptions(Request $request)
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

        $user_id = Auth::user()->user_id;

        $subscriptions = UserSubscription::where('user_id', $user_id)->where('status', 'active')
        ->orderBy('id','DESC')
        ->skip($offset)->take($limit)->get();

        
        if($subscriptions){
            return response()->json([
                'status' => true,
                'message' => 'Get user subscriptions data successfully',
                'subscriptions' => $subscriptions,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'user subscriptions not exist, please try again',
            ], 401);
        }
       
    }
    
    


    public function store_usersubscription(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'subscription_name' => 'required',
                'category' => 'required',
                'plan' => 'required',
                'cost' => 'required',
                'frequency' => 'required',
                'next_payment_due' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user_id = Auth::user()->user_id;

            $subscription = UserSubscription::where('user_id', $user_id)->where('subscription_name', $request->subscription_name)->where('category', $request->category)->where('frequency', $request->frequency)->where('plan', $request->plan)->where('next_payment_due', $request->next_payment_due)->where('status', 'active')->first();

            if($subscription){
                return response()->json([
                    'status' => false,
                    'message' => 'Subscription already added in list',
                ], 200);
            }else{

                $userSubscriptionData = UserSubscription::create([
                    'subscription_name' => $request->subscription_name,
                    'category' => $request->category,
                    'cost' => $request->cost,
                    'plan' => $request->plan,
                    'frequency' => $request->frequency,
                    'next_payment_due' => $request->next_payment_due,
                    'user_id' => $user_id,
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'new user subscription added successfully',
                ], 200);
            }
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store_subscription_byuser(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'subscription_name' => 'required',
                'category' => 'required',
                'cost' => 'required',
                'frequency' => 'required',
                'next_payment_due' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user_id = Auth::user()->user_id;

            $subscription = Subscription::where('subscriptionName', $request->subscription_name)->first();

            if($subscription){

                $subscription1 = UserSubscription::where('user_id', $user_id)->where('subscription_name', $request->subscription_name)->where('category', $request->category)->where('frequency', $request->frequency)->where('next_payment_due', $request->next_payment_due)->where('status', 'active')->first();

                    if($subscription1){
                        return response()->json([
                            'status' => false,
                            'message' => 'Subscription already added in list',
                        ], 200);
                    }else{

                        $userSubscriptionData = UserSubscription::create([
                            'subscription_name' => $request->subscription_name,
                            'category' => $request->category,
                            'cost' => $request->cost,
                            'frequency' => $request->frequency,
                            'next_payment_due' => $request->next_payment_due,
                            'user_id' => $user_id,
                        ]);

                        return response()->json([
                            'status' => true,
                            'message' => 'Subscription already added in list',
                        ], 200);
                    }
            }else{

                $subscriptionData = Subscription::create([
                    'subscriptionName' => $request->subscription_name,
                    'category' => $request->category,
                    'type' => 'user_created'
                ]);
 
                $userSubscriptionData = UserSubscription::create([
                    'subscription_name' => $request->subscription_name,
                    'category' => $request->category,
                    'cost' => $request->cost,
                    'frequency' => $request->frequency,
                    'next_payment_due' => $request->next_payment_due,
                    'user_id' => $user_id,
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'Subscription added successfully',
                ], 200);
            }
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update_usersubscriptions(Request $request)
    {
        try {

            $validateUser = Validator::make($request->all(), 
            [
                'subscription_name' => 'required',
                'category' => 'required',
                'cost' => 'required',
                'plan' => 'required',
                'frequency' => 'required',
                'next_payment_due' => 'required',

            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user_id = Auth::user()->user_id;

                $data = array(
                    'subscription_name' => $request->subscription_name,
                    'category' => $request->category,
                    'cost' => $request->cost,
                    'plan' => $request->plan,
                    'frequency' => $request->frequency,
                    'next_payment_due' => $request->next_payment_due,
                    'user_id' => $user_id,
                );

                $user_subscription_id = $request->input('user_subscription_id');
                
                $subscription1 = UserSubscription::where('user_id', $user_id)->where('cost', $request->cost)->where('subscription_name', $request->subscription_name)->where('category', $request->category)->where('frequency', $request->frequency)->where('next_payment_due', $request->next_payment_due)->where('status', 'active')->first();

                    if($subscription1){
                        return response()->json([
                            'status' => false,
                            'message' => 'Subscription already added in list',
                        ], 200);
                    }else{
                        
                        UserSubscription::where('id',$user_subscription_id)->update($data);
                    }
                return response()->json([
                    'status' => true,
                    'message' => 'Subscription updated successfully',
                ], 200);
            
             
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function delete_usersubscriptions($id)
    {
        $delete = UserSubscription::findOrFail($id);
     
        if($delete->delete()){
            return response()->json([
                'status' => true,
                'message' => 'Subscription deleted successfully',
            ], 200);
        }
        return response()->json([
            'status' => true,
            'message' => 'Subscription deleted successfully',
        ], 200);
    
    }
    
    public function bulkDelete(Request $request)
    {
        if ($request->has('selectedIds')) {
            $selectedIds = $request->input('selectedIds'); 
            // Assuming your model is named Item
            UserSubscription::whereIn('id', $selectedIds)->delete();
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Please select data to delete',
            ], 401);
        }
        
        return response()->json([
            'status' => true,
            'message' => 'Selected items deleted successfully',
        ], 200);
       
    }

   
}
