<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subscription;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = User::where('user_role', 'user' )->orderBy('id','DESC')->get();
        $activeusers = User::where('user_role', 'user' )->where('status', 'active' )->orderBy('id','DESC')->get();
        $subscriptions = Subscription::orderBy('id','DESC')->get();
        
        $no_of_activeusers = count($activeusers);
        $no_of_users = count($users);
        $no_of_subscriptions = count($subscriptions);
 
        return view('home', compact('no_of_users', 'no_of_subscriptions', 'no_of_activeusers'));
    }
}
