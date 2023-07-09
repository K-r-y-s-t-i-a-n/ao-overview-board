<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'display_name' => $this->display_name,
            'email' => $this->email,
            'role' => $this->role->name ?? null,
            'team' => [
                'id' => $this->team->id ?? null,
                'name' => $this->team->name ?? null,
                'color' => $this->team->color->color_name ?? null
            ],
            'avatar' => $this->avatar ?? null
        ];
    }
}
