<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::factory()->create([
            'name' => 'Admin'
        ]);

        $viewer = Role::factory()->create([
            'name' => 'Viewer'
        ]);

        Role::factory()->create([
            'name' => 'Maintenance Engineer'
        ]);

        Role::factory()->create([
            'name' => 'CI Team Member'
        ]);

        Role::factory()->create([
            'name' => 'Shift Leader'
        ]);

        $permissions = Permission::all();

        $admin->permissions()->attach($permissions->pluck('id'));

        $viewer->permissions()->attach([3, 5]);
    }
}
