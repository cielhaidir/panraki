<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $tikRole = Role::create(['name' => 'tik']);
        $mrRole = Role::create(['name' => 'mr']);
        $rtRole = Role::create(['name' => 'rt']);

        // Assign roles to users
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole($adminRole);

        $tikUser = User::create([
            'name' => 'Tik User',
            'email' => 'tik@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
        $tikUser->assignRole($tikRole);

        $mrUser = User::create([
            'name' => 'Mr User',
            'email' => 'mr@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
        $mrUser->assignRole($mrRole);

        $rtUser = User::create([
            'name' => 'Rt User',
            'email' => 'rt@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
        $rtUser->assignRole($rtRole);
    }
}
