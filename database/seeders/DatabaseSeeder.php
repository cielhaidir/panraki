<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Kontak;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */


    public function run(): void
    {

        $admin = User::create([
            'name' => 'Admin User',
            'username' => 'Admin',
            'email' => 'admin@poliupg.ac.id',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
    

        $tikUser = User::create([
            'name' => 'Tik User',
            'username' => 'tik',
            'email' => 'tik@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
  

        $mrUser = User::create([
            'name' => 'Mr User',
            'username' => 'mr',
            'email' => 'mr@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);
  
       
        $rtUser = User::create([
            'name' => 'Rt User',
            'username' => 'rt',
            'email' => 'rt@poliupg.ac.id',
            'password' => bcrypt('password'),
        ]);


        Kontak::create([
            'id' => '1',
            'unit' => 'tik',
            'pj1' => '082244525871',
            'pj2' => '082244525871',
        ]);
        Kontak::create([
            'id' => '2',
            'unit' => 'mr',
            'pj1' => '082244525871',
            'pj2' => '082244525871',
        ]);
        Kontak::create([
            'id' => '3',
            'unit' => 'rt',
            'pj1' => '082244525871',
            'pj2' => '082244525871',
        ]);
     

    }
}
