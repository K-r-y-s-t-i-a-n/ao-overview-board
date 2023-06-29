<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'text' => $this->faker->text(rand(30, 500)),
            'added_by' => $this->faker->name,
            'team_id' => rand(1, 3),
            'is_edited' => false,
            'tags' => Tag::all()->random()->id

        ];
    }
}
