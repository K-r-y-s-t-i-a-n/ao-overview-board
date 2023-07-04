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

    // public function storeAvatar(Request $request)
    // {


    //     $request->validate([
    //         'avatar' => 'required|image|max:1000'
    //     ]);
    //     //? $request->file('avatar')->store('/public/avatars');

    //     $user = auth()->user();

    //     $filename = $user->id . '-' . uniqid() . '.jpg';
    //     $resizedImg = Image::make($request->file('avatar'))->fit(120)->encode('jpg');
    //     Storage::put('public/avatars_120x120/' . $filename, $resizedImg);

    //     $oldAvatar = $user->avatar;

    //     $user->avatar = $filename;
    //     /** @var \App\Models\User $user **/
    //     $user->save();

    //     if ($oldAvatar != '/fallback-avatar.png') {
    //         Storage::delete(str_replace("/storage/", "public/", $oldAvatar));
    //     }

    //     return back()->with('success', 'Photo uploaded.');
    // }



    public function show()
    {
    }
}
