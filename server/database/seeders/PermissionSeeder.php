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
            // ROLES
            ['name' => 'edit_users', 'display_name' => 'Edit users'],
            ['name' => 'edit_roles', 'display_name' => 'Edit roles'],
            // NOTES
            ['name' => 'view_notes', 'display_name' => 'View notes'],
            ['name' => 'create_notes', 'display_name' => 'Add notes'],
            // ACTIONS
            ['name' => 'view_actions', 'display_name' => 'View actions'],
            ['name' => 'create_actions', 'display_name' => 'Add new actions'],
            ['name' => 'edit_actions', 'display_name' => 'Add next steps to actions'],
            ['name' => 'edit_actionsStatus', 'display_name' => "Change action's status"],
            ['name' => 'delete_actions', 'display_name' => 'Close actions'],
            ['name' => 'view_actionsDeleted', 'display_name' => 'View closed actions'],
            ['name' => 'delete_actionsPerm', 'display_name' => 'Delete actions permanently'],
            ['name' => 'edit_actionsPerm', 'display_name' => 'Restore actions'],
        ]);
    }
}
