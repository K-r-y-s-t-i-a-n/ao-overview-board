<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Factories\TeamColorFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeamColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = ['blue', 'pink', 'orange', 'yellow', 'cyan', 'grape', 'violet', 'indigo', 'teal', 'green', 'lime'];

        foreach ($colors as $color) {
            DB::table('teambgcolors')->insert([
                'color_name' => $color
            ]);
        }
    }
}
