<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\EmployeeResource;

class EmployeeController extends Controller
{
    public function index()
    {
        // $this->authorize('view', 'employees');
        return EmployeeResource::collection(User::all());
    }
}
