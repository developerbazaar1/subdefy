<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Models\Favorite;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{
    

    public function get_subscriptions(Request $request)
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
        
        $data = array();
        
        if ($request->has('name')) {
            $data['name'] = $request->input('name'); 
        }
        
        if ($request->has('sort')) {
            $data['sort'] = $request->input('sort'); 
        }

        if ($request->has('category_name')) {
            $data['category_name'] = $request->input('category_name'); 
        }

        if ($request->has('subcategory_name')) {
            $data['subcategory_name'] = $request->input('subcategory_name'); 
        }
        
        if($request->has('category_name')){

                $subscriptions = Subscription::with('favorites')
            
                ->when(!empty($data['category_name']) , function ($query) use($data){
                    return $query->where('category', 'LIKE', '%' . $data['category_name'] . '%');
                })
                ->where('type', 'admin_created')
                ->orderBy('id','DESC')
                ->skip($offset)->take($limit)->get();

        }else if($request->has('subcategory_name')){
                
                $subscriptions = Subscription::with('favorites')
            
                ->where('subCategory', 'LIKE', "%{$data['subcategory_name']}%")
                ->where('type', 'admin_created')
                ->orderBy('id','DESC')
                ->skip($offset)->take($limit)->get();
 
        }else if($request->has('sort')){
             $subscriptions = array(); 
                // sort=Most Popular    // New Release , //  Explore , // Gift Subscription                         // ->where('relatedTerms', 'LIKE', "%{$data['sort']}%")
                if($request->input('sort') == 'Most Popular'){
                    
                    $subscriptions = Subscription::with('favorites')
                    ->where('mostpopular_status', 'active')
                    ->where('type', 'admin_created')
                    ->orderBy('id','DESC')
                    ->skip($offset)->take($limit)->get();
                
                }else if($request->input('sort') == 'New Release'){
                    $subscriptions = Subscription::with('favorites')
                    ->where('newrelease_status', 'active')
                    ->where('type', 'admin_created')
                    ->orderBy('id','DESC')
                    ->skip($offset)->take($limit)->get();
                    
                }else if($request->input('sort') == 'Explore'){
                    $subscriptions = Subscription::with('favorites')
                    ->where('explore_status', 'active')
                    ->where('type', 'admin_created')
                    ->orderBy('id','DESC')
                    ->skip($offset)->take($limit)->get();
                    
                }else{
                    $subscriptions = Subscription::with('favorites')
                    ->where('giftsubscription_status', 'active')
                    ->where('type', 'admin_created')
                    ->orderBy('id','DESC')
                    ->skip($offset)->take($limit)->get();
                    
                }
        }else{


            $subscriptions = Subscription::with('favorites')->where('type', 'admin_created')
            
            ->when(!empty($data['name']) , function ($query) use($data){
                return $query->where('subscriptionName', 'LIKE', '%' . $data['name'] . '%');
            })
            ->when(!empty($data['name']) , function ($query) use($data){
                        return $query->orWhere('category', 'LIKE', '%' . $data['name'] . '%');
                    })
            ->when(!empty($data['name']) , function ($query) use($data){
                        return $query->orWhere('subCategory', 'LIKE', '%' . $data['name'] . '%');
                    })
            ->when(!empty($data['name']) , function ($query) use($data){
                        return $query->orWhere('relatedTerms', 'LIKE', '%' . $data['name'] . '%');
                    })
            ->when(!empty($data['name']) , function ($query) use($data){
                        return $query->orWhere('relatedTerms', 'LIKE', '%' . $data['name'] . '%');
                    })

            
            ->orderBy('id','DESC')
            ->skip($offset)->take($limit)->get();

        } 
       
        $a = array();
        if (Auth::check()) {
            foreach ($subscriptions as $pbook) {
          
                foreach ($pbook->favorites as $fav) {
    
                    if($fav->user_id == auth::user()->user_id){ 
                        array_push($a, $fav->subscription_name);
                    }
                    
                }
            }
        }
        if($subscriptions){
            return response()->json([
                'status' => true,
                'message' => 'Get subscriptions data successfully',
                'subscriptions' => $subscriptions,
                'favorite' => $a,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'subscriptions not exist, please try again',
            ], 401);
        }
       
    }
    
    public function get_subscription_names(Request $request)
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
        
        $data = array();
        
        if ($request->has('name')) {
            $data['name'] = $request->input('name'); 
        }

       
        $subscriptions = Subscription::where('type', 'admin_created')
        ->when(!empty($data['name']) , function ($query) use($data){
            return $query->where('subscriptionName', 'LIKE', '%' . $data['name'] . '%');
        })
       
        ->orderBy('id','DESC')
        ->skip($offset)->take($limit)->pluck('subscriptionName')->toArray();

        
        if($subscriptions){
            return response()->json([
                'status' => true,
                'message' => 'Get subscriptions data successfully',
                'subscriptions' => $subscriptions,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'subscriptions not exist, please try again',
            ], 401);
        }
       
    }

     public function get_subscription_details(Request $request)
    {   
        if ($request->has('name')) {
            $name = $request->input('name');
        }
        
        $subscription = Subscription::with('plans')->where('subscriptionName', $name)->first();

        if($subscription){
            
        if (Auth::check()) {     
            $fav = Favorite::where('subscription_name', $subscription->subscriptionName)->where('user_id', auth::user()->user_id)->get();
      
                if(count($fav) > 0){  
                    $isFavorite = 1;
                }else{
                    $isFavorite = 0;
                }
        }else{
            $isFavorite = 0;
        }    
            return response()->json([
                'status' => true,
                'message' => 'Get subscription data successfully',
                'subscription' => $subscription,
                'isFavorite' => $isFavorite,
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'subscriptions not exist, please try again',
            ], 401);
        }
       
    }
    
    

   
}
