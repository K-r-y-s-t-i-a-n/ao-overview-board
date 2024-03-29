<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use PHPUnit\Logging\Exception;
use Illuminate\Validation\Rule;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller
{
    public function index()
    {
        // return new RoleResource(Role::with('permissions')->get());
        return RoleResource::collection(Role::with('permissions')->get());
    }


    public function store(RoleRequest $request)
    {
        $this->authorize('edit', 'roles');

        $role = Role::create($request->only('name'));

        $role->permissions()->attach($request->input('permissions'));

        return response(new RoleResource($role->load('permissions')), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return new RoleResource(Role::with('permissions')->find($id));
    }

    public function update(RoleRequest $request, $id)
    {
        $this->authorize('edit', 'roles');

        $role = Role::find($id);

        if (!$role) {
            return response(Response::HTTP_NOT_FOUND);
        }

        $role->update($request->only('name'));

        $role->permissions()->sync($request->input('permissions'));

        return response(new RoleResource($role->load('permissions')), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->authorize('edit', 'roles');

        Role::destroy($id);

        return response(["id" => $id], Response::HTTP_ACCEPTED);
    }
}
