<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1 - blue, 2 - pink, 3 - orange, 4 - yellow 5 - cyan, 6 - grape, 7 - violet,
        // 8 - indigo, 9 - teal, 10 - green, 11 - lime,

        $teams = ['Maintenance' => 1, 'Manager' => 2, 'CI Team' => 3, 'IT Team' => 4];

        foreach ($teams as $team => $color) {
            DB::table('Teams')->insert([
                'name' => $team,
                'color_id' => $color
            ]);
        }
    }
}
