<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'display_name' => 'Super Admin',
            'email' => 'super.admin@airwaysoptical.co.uk',
            'role_id' => 1
        ]);

        User::factory()->create([
            'first_name' => 'View',
            'last_name' => 'Account',
            'display_name' => 'View Account',
            'email' => 'view.account@airwaysoptical.co.uk',
            'role_id' => 2
        ]);
    }
}
