<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    
    // ---------faq Routes ----------------//
    Route::get('/faq', [App\Http\Controllers\FaqController::class, 'index'])->name('faq');
    Route::get('/faq-add', [App\Http\Controllers\FaqController::class, 'create'])->name('faq-add');
    Route::post('/faq/store', [App\Http\Controllers\FaqController::class, 'store'])->name('faq-store');
    Route::get('/faq/edit/{id}', [App\Http\Controllers\FaqController::class, 'edit'])->name('faq-edit');
    Route::post('/faq/update', [App\Http\Controllers\FaqController::class, 'update'])->name('faq-update');
    Route::get('/delete-faq/{id}', [App\Http\Controllers\FaqController::class, 'destroy']); 

    Route::get('/changefaqtatus', [App\Http\Controllers\FaqController::class, 'changefaqtatus']);

     // ---------User Routes ----------------//
    Route::get('/users', [App\Http\Controllers\UserController::class, 'index'])->name('users');
    Route::post('/user/update', [App\Http\Controllers\UserController::class, 'update'])->name('user-update');
    Route::get('/delete-user/{id}', [App\Http\Controllers\UserController::class, 'destroy']); 

    Route::get('/changeuserStatus', [App\Http\Controllers\UserController::class, 'changeUserStatus'])->name('changeuserStatus');

    // page 
    Route::get('/pages', [App\Http\Controllers\PageController::class, 'index'])->name('pages');
    Route::get('/page-add', [App\Http\Controllers\PageController::class, 'create'])->name('page-add');
    Route::post('/page/store', [App\Http\Controllers\PageController::class, 'store'])->name('page-store');
    Route::get('/page/edit/{id}', [App\Http\Controllers\PageController::class, 'edit'])->name('page-edit');
    Route::post('/page/update', [App\Http\Controllers\PageController::class, 'update'])->name('page-update');
    Route::get('/delete-page/{id}', [App\Http\Controllers\PageController::class, 'destroy']); 

    Route::get('/changepageStatus', [App\Http\Controllers\PageController::class, 'changepageStatus']);

    // blog
    Route::get('/blogs', [App\Http\Controllers\BlogController::class, 'index'])->name('blogs');
    Route::get('/blog-add', [App\Http\Controllers\BlogController::class, 'create'])->name('blog-add');
    Route::post('/blog/store', [App\Http\Controllers\BlogController::class, 'store'])->name('blog-store');
    Route::get('/blog/edit/{id}', [App\Http\Controllers\BlogController::class, 'edit'])->name('blog-edit');
    Route::post('/blog/update', [App\Http\Controllers\BlogController::class, 'update'])->name('blog-update');
    Route::get('/delete-blog/{id}', [App\Http\Controllers\BlogController::class, 'destroy']); 
    Route::get('/changeBlogStatus', [App\Http\Controllers\BlogController::class, 'changeBlogStatus'])->name('changeBlogStatus');
    
    
    // newsletter
    Route::get('/newsletter', [App\Http\Controllers\NewsletterController::class, 'index'])->name('newsletter');
    Route::get('/delete-newsletter/{id}', [App\Http\Controllers\NewsletterController::class, 'destroy']); 

    // password setting
    Route::get('/password-setting', [App\Http\Controllers\SettingController::class, 'password_setting'])->name('password-setting');
    Route::post('/password-setting-store', [App\Http\Controllers\SettingController::class, 'password_setting_store'])->name('password-setting-store');

    // smtp setting
    Route::get('/smtp-setting', [App\Http\Controllers\SettingController::class, 'smtp_setting'])->name('smtp-setting');
    Route::post('/smtp-setting-store', [App\Http\Controllers\SettingController::class, 'smtp_setting_store'])->name('smtp-setting-store');

    // excel 
    

    Route::get('/subscription',[App\Http\Controllers\SubscriptionController::class,'importView'])->name('subscription');
    Route::post('/subscription-import',[App\Http\Controllers\SubscriptionController::class,'import'])->name('subscription-import');
    Route::get('/subscription-export',[App\Http\Controllers\SubscriptionController::class,'exportSubscription'])->name('subscription-export');

    Route::get('/subscription/edit/{id}', [App\Http\Controllers\SubscriptionController::class, 'edit'])->name('subscription-edit');
    Route::post('/subscription/update', [App\Http\Controllers\SubscriptionController::class, 'update'])->name('subscription-update');
    Route::get('/delete-subscription/{id}', [App\Http\Controllers\SubscriptionController::class, 'destroy']);
    
    Route::post('/items/bulk-delete', [App\Http\Controllers\SubscriptionController::class, 'bulkDelete'])->name('items.bulk-delete');
    
     Route::get('/changeSortStatus', [App\Http\Controllers\SubscriptionController::class, 'changeSortStatus'])->name('changeSortStatus');
     
    // plan

    Route::get('/plans',[App\Http\Controllers\SubscriptionController::class,'plans'])->name('plans');
    Route::post('/plan-import',[App\Http\Controllers\SubscriptionController::class,'importplan'])->name('plan-import');
    Route::get('/plan-export',[App\Http\Controllers\SubscriptionController::class,'exportplan'])->name('plan-export');

    Route::get('/plan/edit/{id}', [App\Http\Controllers\SubscriptionController::class, 'edit_plan'])->name('plan-edit');
    Route::post('/plan/update', [App\Http\Controllers\SubscriptionController::class, 'update_plan'])->name('plan-update');

    Route::get('/delete-plan/{id}', [App\Http\Controllers\SubscriptionController::class, 'destroyplan']);
    
    Route::post('/upload-image', [App\Http\Controllers\ImageController::class, 'upload'])->name('upload-image');
});

