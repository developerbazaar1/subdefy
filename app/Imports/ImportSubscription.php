<?php

namespace App\Imports;

use App\Models\Subscription;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;


class ImportSubscription implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    // public function model(array $row)
    // { 
    //     return new Subscription([
    //         'name' => $row[0],
    //         'email' => $row[1],
            
    //     ]);
    // }

    public function collection(Collection $rows)
    { 
        foreach ($rows as $row) 
        {
            if(isset($row['0']) && isset($row['1']) && ($row['0'] == 'subscriptionName' || $row['1'] == 'logoURL')){
                
            }else{
                
                $subscription = Subscription::where('subscriptionName', $row[0] )->first();

                if($subscription){
                      
                }else{
                    Subscription::create([
                        'subscriptionName' => $row[0],
                        'logoURL' => $row[1],
                        'subscriptionDescriptionShort' => $row[2],
                        'subscriptionDescriptionLong' => $row[3],
                        'premiumSubscriptionsFrom' => $row[4],
                        'cancelUrl' => $row[5],
                        'cancelEmail' => $row[6],
                        'cancelPhone' => $row[7],
                        'manageUrl' => $row[8],
                        'desktop' => $row[9],
                        'mobile_app' => $row[10],
                        'email' => $row[11],
                        'phone_call' => $row[12],
                        'signUpUrl' => $row[13],
                        'freeTrial' => $row[14],
                        'category' => $row[15],
                        'subCategory' => $row[16],
                        'relatedTerms' => $row[17],
                        'companyName' => $row[18],
                        'subscriptionId' => $row[19],
                        'affiliateProgram' => $row[20],
                        'banner_image' => $row[21],
                        'gallery_image' => $row[22],
                        'rating' => $row[23],
                    ]);
                }

                
                
            }
        }
        
    }
}
