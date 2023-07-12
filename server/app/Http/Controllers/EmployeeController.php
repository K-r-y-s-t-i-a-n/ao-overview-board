<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\EmployeeResource;
use Illuminate\Support\Facades\Validator;
use App\Actions\Fortify\PasswordValidationRules;
use App\Http\Requests\UserRequest;
use Symfony\Component\HttpFoundation\Response;

class EmployeeController extends Controller
{
    public function index()
    {
        $this->authorize('edit', 'users');
        return EmployeeResource::collection(User::all());
    }

    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */

    public function store(Request $request)
    {
        $this->authorize('edit', 'users');

        $input = $request->input();

        Validator::make($input, [
            'first_name' => ['required', 'string', 'min:2', 'max:255'],
            'last_name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'role_id' => ['sometimes', 'required', 'integer', Rule::exists('roles', 'id')],
            'team_id' => ['sometimes', 'required', 'integer', Rule::exists('teams', 'id')],
        ])->validate();

        $employeeData = [
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'display_name' => "{$input['first_name']} {$input['last_name']}",
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ];

        if (isset($input['role_id'])) {
            $employeeData['role_id'] = $input['role_id'];
        }

        if (isset($input['team_id'])) {
            $employeeData['team_id'] = $input['team_id'];
        }

        $employee = User::create($employeeData);

        return response(new EmployeeResource($employee), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $this->authorize('edit', 'users');

        $input = $request->input();

        Validator::make($input, [
            'first_name' => ['required', 'string', 'min:2', 'max:255'],
            'last_name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($id),
            ],
            'role_id' => ['sometimes', 'required', 'integer', Rule::exists('roles', 'id')],
            'team_id' => ['sometimes', 'required', 'integer', Rule::exists('teams', 'id')],
        ])->validate();


        $employeeData = [
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'display_name' => "{$input['first_name']} {$input['last_name']}",
            'email' => $input['email'],
        ];


        if (isset($input['role_id'])) {
            $employeeData['role_id'] = $input['role_id'];
        }

        if (isset($input['team_id'])) {
            $employeeData['team_id'] = $input['team_id'];
        }

        $user = User::find($id);

        if (!$user) {
            return response(Response::HTTP_ACCEPTED);
        }

        $user->update($employeeData);

        return response(new EmployeeResource($user), Response::HTTP_ACCEPTED);
    }

    public function delete(Request $request, $id)
    {
        $this->authorize('edit', 'users');

        $user = User::find($id);

        if (!$user) {
            return response(Response::HTTP_BAD_REQUEST);
        }

        $user->delete();

        return response(Response::HTTP_NO_CONTENT);
    }
}
