<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;



Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::post('/login', [AuthController::class, 'loginPost']);
Route::get('/user-id', [TodoController::class, 'userID']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/todos/{user_id}', [TodoController::class, 'index'])->name('todos.index');
Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
Route::put('/todos/{id}/done', [TodoController::class, 'markAsDone'])->name('todos.markAsDone');
Route::delete('/todos/{id}', [TodoController::class, 'destroy'])->name('todos.destroy');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
