<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ImportSubscription;
use App\Exports\ExportSubscription;
use App\Imports\ImportPlan;
use App\Exports\ExportPlan;
use App\Models\Subscription;
use App\Models\Plan;
use Illuminate\Support\Facades\Crypt;

class SubscriptionController extends Controller
{
    public function importView(Request $request){
        $subscriptions = Subscription::orderBy('id','DESC')->where('type', 'admin_created')->get();
        return view('admin.subscription.index',compact('subscriptions'));
    }

    public function import(Request $request){
        if($request->file('file')){
            Excel::import(new ImportSubscription, $request->file('file')->store('files'));
            return redirect()->back()->with('success','Import data successfully');
        }else{
            return redirect()->back()->with('error','Please select file');
        }
        
    }

    public function exportSubscription(Request $request){
        return Excel::download(new ExportSubscription, 'subscription.csv');
    }

    public function edit($id)
    {
        $subid = Crypt::decrypt($id); 
        $subscription= Subscription::where('id',$subid)->first();
        $plans = Plan::where('subscriptionName',$subscription->subscriptionName)->orderBy('id','DESC')->get();

        if(!empty($subscription)){
            return view('admin.subscription.edit',compact('subscription', 'plans'));
        }else{
            return redirect()->back()->with('error','Subscription having error, try again');
        }
    }

    
    public function update(Request $request)
    { 
        
        $id = $request->subid;
       
        $data = array(
            "subscriptionName"=>$request->subscriptionName, 
            "logoURL"=>$request->logoURL, 
            "subscriptionDescriptionShort"=>$request->subscriptionDescriptionShort, 
            "subscriptionDescriptionLong"=>$request->subscriptionDescriptionLong,
            "premiumSubscriptionsFrom"=>$request->premiumSubscriptionsFrom,
            "cancelUrl"=>$request->cancelUrl,
            "cancelEmail"=>$request->cancelEmail,
            "cancelPhone"=>$request->cancelPhone,
            "manageUrl"=>$request->manageUrl,
            "desktop"=>$request->desktop,
            "mobile_app"=>$request->mobile_app,
            "email"=>$request->email,
            "phone_call"=>$request->phone_call,
            "freeTrial"=>$request->freeTrial,
            "category"=>$request->category,
            "subCategory"=>$request->subCategory,
            "relatedTerms"=>$request->relatedTerms,
            "companyName"=>$request->companyName,
            "subscriptionId"=>$request->subscriptionId,
            "affiliateProgram"=>$request->affiliateProgram,
            "signUpUrl"=>$request->signUpUrl,
            "banner_image"=>$request->banner_image,
            "gallery_image"=>$request->gallery_image,
            "rating"=>$request->rating,

        );
             
        Subscription::where('id',$id)->update($data);

        return redirect()->back()->with('success', 'Subscription Updated Successfully');
    }


    public function destroy($id)
    {
        $delete = Subscription::findOrFail($id);
        if($delete->delete()){
            return redirect()->back()->with('success_add','Subscription data deleted successfully');
        }
        return redirect()->back()->with('success_add','Subscription data deleted successfully');
    
    }

    // plans--------------

    public function plans(Request $request){
        $plans = Plan::orderBy('id','DESC')->get();
        return view('admin.plan.index',compact('plans'));
    }

    public function importplan(Request $request){
        if($request->file('file')){
            Excel::import(new ImportPlan, $request->file('file')->store('files'));
            return redirect()->back()->with('success','Import data successfully');
        }else{
            return redirect()->back()->with('error','Please select file');
        }
    }

    public function exportplan(Request $request){
        return Excel::download(new ExportPlan, 'plan.csv');
    }


    public function edit_plan($id)
    {
        $planid = Crypt::decrypt($id); 
        $plan= Plan::where('id',$planid)->first();
        if(!empty($plan)){
            return view('admin.plan.edit',compact('plan'));
        }else{
            return redirect()->back()->with('error','Plan having error, try again');
        }
    }

    
    public function update_plan(Request $request)
    { 
        
        $id = $request->planid;
       
        $data = array(
            "subscriptionName"=>$request->subscriptionName, 
            "region"=>$request->region, 
            "planName"=>$request->planName, 
            "defaultCost"=>$request->defaultCost,
            "defaultBillingCycle"=>$request->defaultBillingCycle,
            "commitment"=>$request->commitment,
            "subscription_id"=>$request->subscription_id,
        );
             
        Plan::where('id',$id)->update($data);

        return redirect()->back()->with('success', 'Plan Updated Successfully');
    }

    public function destroyplan($id)
    {
        $delete = Plan::findOrFail($id);
        if($delete->delete()){
            return redirect()->back()->with('success_add','Subscription plan data deleted successfully');
        }
        return redirect()->back()->with('success_add','Subscription plan data deleted successfully');
    
    }
    
    
    public function bulkDelete(Request $request)
    {
        if ($request->has('selectedIds')) {
            $selectedIds = $request->input('selectedIds');
            // Assuming your model is named Item
            Subscription::whereIn('id', $selectedIds)->delete();
        }
        
        
        if ($request->has('selectedIdsplan')) {
            $selectedIds = $request->input('selectedIdsplan');
            // Assuming your model is named Item
            Plan::whereIn('id', $selectedIds)->delete();
        }
        
        return response()->json([
            'status' => true,
            'message' => 'Selected items deleted successfully',
        ], 200);
       
    }
}