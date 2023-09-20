<?php

namespace App\Imports;

use App\Models\Plan;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;


class ImportPlan implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
   

    public function collection(Collection $rows) 
    { 
        foreach ($rows as $row) 
        {
            if(isset($row['0']) && isset($row['1']) && ($row['0'] == 'Subscription name' || $row['1'] == 'Region')){
                
            }else{
                
                $plan = Plan::where('subscriptionName', $row[0] )->where('planName', $row[2] )->first();

                if($plan){
                      
                }else{
                    Plan::create([
                        'subscriptionName' => $row[0],
                        'region' => $row[1],
                        'planName' => $row[2],
                        'defaultCost' => $row[3],
                        'defaultBillingCycle' => $row[4],
                        'commitment' => $row[5],
                        'subscription_id' => $row[6],
        
                    ]);
                }

                
                
            }


                
                
            
        }
        
    }
}
