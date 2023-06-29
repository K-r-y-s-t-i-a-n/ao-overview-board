<?php

namespace App\Http\Resources;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
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
            'text' => $this->text,
            'added_by' => $this->added_by,
            'is_edited' => $this->is_edited,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'team' => new TeamResource($this->team),
            // 'tags' => [new TagResource($this->tags)]
            'tags' => TagResource::collection($this->tags)
            // 'tags' => new TagResource($this->tags)::collection(),
        ];
    }
}
