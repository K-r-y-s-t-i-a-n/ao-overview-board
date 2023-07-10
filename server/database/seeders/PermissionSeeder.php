<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::insert([
            ['name' => 'edit_users', 'display_name' => 'Edit users'],
            ['name' => 'edit_roles', 'display_name' => 'Edit roles'],
            ['name' => 'view_notes', 'display_name' => 'View notes'],
            ['name' => 'create_notes', 'display_name' => 'Add notes'],
            // ['name' => 'view_products', 'display_name' => 'View users'],
            // ['name' => 'edit_products', 'display_name' => 'View users'],
            // ['name' => 'view_orders', 'display_name' => 'View users'],
            // ['name' => 'edit_orders', 'display_name' => 'View users'],
            ['name' => 'view_actions', 'display_name' => 'View Actions'],
            ['name' => 'create_actions', 'display_name' => 'Add new actions'],
        ]);
    }
}
