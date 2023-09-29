<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ActionRequest extends FormRequest
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
            'asset' => ['integer', Rule::exists('tags', 'id')],
            'status' => 'required|in:RWI,Stopped,Testing,Other',
            'issue' => ['required', 'string', 'max:255'],
            'step' => ['required', 'string', 'max:1000']
        ];
    }
}
