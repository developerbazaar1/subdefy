<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\UserSubscription;
use App\Models\Subscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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

        $subscriptions = UserSubscription::with('categorydetails')->with('subscriptiondetails')->where('user_id', $user_id)->where('status', 'active')
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
    
    public function get_user_events(Request $request)
    {   
        if ($request->has('limit')) {
            $limit = $request->input('limit');
        }else{
            $limit = 500000;
        }
        
        if ($request->has('offset')) {
            $offset = $request->input('offset');
        }else{
            $offset = 0;
        }

        $user_id = Auth::user()->user_id;

        $subscriptions = UserSubscription::with('categorydetails')->where('user_id', $user_id)->where('status', 'active')
        ->orderBy('id','DESC')
        ->skip($offset)->take($limit)->get();
// print_r($user_id); die;
        $events = array();
        
        foreach($subscriptions as $sub){
            
            $frequency = $sub->frequency;
            $date1 = $sub->next_payment_due;
      
            if($frequency == 'monthly' || $frequency == 'Monthly' || $frequency == '1 Month Plan'){
                $startDate = strtotime($date1); // Change this to your desired start date

                $months = 12;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+1 month', $startDate);
                }
            }else if($frequency == '3 Months' || $frequency == 'quarterly' || $frequency == '3 Month Plan'){
                $startDate = strtotime($date1); // Change this to your desired start date

                $months = 4;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+6 month', $startDate);
                }
            }else if($frequency == '6 Months' || $frequency == 'half yearly' || $frequency == '6 Month Plan'){
                $startDate = strtotime($date1); // Change this to your desired start date

                $months = 2;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+6 month', $startDate);
                }
            }else if($frequency == 'Annually' || $frequency == 'yearly' || $frequency == '12 Month Plan' || $frequency == '1 Year'){
                $startDate = strtotime($date1); // Change this to your desired start date

                $months = 2;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+6 month', $startDate);
                }
            }else if($frequency == '7 day Plan' || $frequency == 'Weekly' || $frequency == 'Week' || $frequency == 'Per Week' || $frequency == '1 Week'){
                $startDate = strtotime($date1); // Change this to your desired start date
                
                $currentYear = date('Y');

                // Create a date for the last day of the current year
                $lastDayOfYear = strtotime('31 December ' . $currentYear);
                
                // Get the day of the year for the last day
                $dayOfYear = date('z', $lastDayOfYear);
                
                // Add 1 to get the total number of days in the current year
                $totalDaysInYear = $dayOfYear + 1;
                
                
                $num = $totalDaysInYear/7;
                $mon = round($num);
                $months = $mon;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+7 day', $startDate);
                }
            }else if($frequency == '28 day Plan'){
                $startDate = strtotime($date1); // Change this to your desired start date
                
                $currentYear = date('Y');

                // Create a date for the last day of the current year
                $lastDayOfYear = strtotime('31 December ' . $currentYear);
                
                // Get the day of the year for the last day
                $dayOfYear = date('z', $lastDayOfYear);
                
                // Add 1 to get the total number of days in the current year
                $totalDaysInYear = $dayOfYear + 1;
                
                
                $num = $totalDaysInYear/28;
                $mon = round($num);
                $months = $mon;
                
                // Loop through each month
                for ($i = 0; $i < $months; $i++) {
                    // Create a new date based on the same day and month
                    $newDate = date('Y-m-d', $startDate);
                    
                    // Output the date for this month
                    $date = $newDate;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
                    
                    // Increment the month for the next iteration
                    $startDate = strtotime('+28 day', $startDate);
                }
            }else{
                    $date = $sub->next_payment_due;
                    $cost = '$'.$sub->cost;
            
                    $event['title'] = $sub->subscription_name;
                    $event['start'] = $date;
                    $event['end'] = $date;
                    $event['description'] = $cost;
                    if(!empty($sub->categorydetails->color)){
                    $event['color'] = $sub->categorydetails->color;
                    }else{
                    $event['color'] = '#000000';    
                    }
                    
                    array_push($events,$event);
            }
      
            
        }
        
        if($subscriptions){
            return response()->json([
                'status' => true,
                'message' => 'Get user subscriptions data successfully',
                'subscriptions' => $events,
            
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
