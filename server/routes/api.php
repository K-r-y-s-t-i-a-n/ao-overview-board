<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\TeamController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:sanctum'], function () {
    // User Controller
    Route::get('me', [UserController::class, 'me']);
    Route::get('users', [UserController::class, 'index']);

    // Roles & Permissions
    Route::apiResource('roles', RoleController::class);
    Route::get('permissions', [PermissionController::class, 'index']);

    // ==================== NOTES ==================

    // Notes
    Route::get('notes', [NoteController::class, 'index']);
    Route::post('notes', [NoteController::class, 'store']);

    // Tags
    Route::get('tags', [TagController::class, 'index']);
    Route::get('tags-by-category', [TagController::class, 'indexCategories']);

    // Machine categories
    Route::get('categories', [TagController::class, 'indexCategoriesOnly']);

    // Teams
    Route::get('teams', [TeamController::class, 'index']);
    Route::post('teams', [TeamController::class, 'store']);

    // Colors
    Route::get('colors', [TeamController::class, 'indexColors']);

    // ==================== ACTIONS ==================
    Route::get('actions', [ActionController::class, 'index']);
    Route::post('actions', [ActionController::class, 'store']);
    Route::put('actions/{id}', [ActionController::class, 'updateStatus']);
    Route::post('actions/{id}/steps', [ActionController::class, 'storeStep']);
    Route::get('actions/restore/{id}', [ActionController::class, 'restore']);
    Route::delete('actions/{id}', [ActionController::class, 'destroy']);
    Route::delete('actions/force/{id}', [ActionController::class, 'forceDelete']);
    // Route::get('actions/restore-all', [PostController::class, 'restoreAll']);


    // ==================== ADMIN ROUTES ==================
    // Employees
    Route::get('admin/employees', [EmployeeController::class, 'index']);
    Route::post('admin/employees', [EmployeeController::class, 'store']);
    Route::put('admin/employees/{id}', [EmployeeController::class, 'update']);
    Route::delete('admin/employees/{id}', [EmployeeController::class, 'delete']);
});
