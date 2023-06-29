<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function me()
    {
        // DB::enableQueryLog();
        // return User::with('role')->find(auth()->user());
        // return auth()->user()->load(['role']);
        // return dd(DB::getQueryLog());

        return new UserResource(auth()->user()->load('role.permissions'));
    }

    public function index()
    {
        $this->authorize('edit', 'users');

        return UserResource::collection(User::get());
    }

    public function show()
    {
    }
}
