<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::Post('/register',[UserController::class,'register']);

Route::Post('/login',[UserController::class,'login']);

Route::Post('/addproduct',[ProductController::class,'addProduct']);

Route::get('list',[ProductController::class,'list']);

Route::get('product/{id}',[ProductController::class,'product']);

Route::put('editproduct/{id}', [ProductController::class, 'editProduct']);

Route::delete('delete/{id}',[ProductController::class,'delete']);

Route::get('searchlist/{search}',[ProductController::class,'searchlist']);

// Route::get('/api/searchList', 'ProductController@list');
