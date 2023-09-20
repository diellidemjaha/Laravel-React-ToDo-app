<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;



Route::middleware(['auth:sanctum'])->group(function () {
  
    Route::get('/', [AuthController::class, 'index'])->name('todos.index');
    
});

Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/loginUser', [AuthController::class, 'loginPost']);
Route::post('/logout', [AuthController::class, 'logout']);




Route::get('/todos/{user_id}', [TodoController::class, 'index'])->name('todos.index');
Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
Route::get('/todos/{id}/edit', [TodoController::class, 'edit'])->name('todos.edit');
Route::put('/todos/{id}', [TodoController::class, 'update'])->name('todos.update');
Route::patch('/todos/{id}/done', [TodoController::class, 'markAsDone'])->name('todos.markAsDone');
Route::delete('/todos/{id}', [TodoController::class, 'destroy'])->name('todos.destroy');