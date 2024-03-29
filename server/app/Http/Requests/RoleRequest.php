<?php

namespace App\Http\Requests;

use App\Rules\IsIntegerRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */


    public function rules(): array
    {
        return [
            'name' => ['required', 'string', Rule::unique('roles')->ignore($this->role)],
            'permissions' => 'required|array',
            'permissions.*' => ['integer', 'distinct', Rule::exists('permissions', 'id')],
        ];
    }
}
