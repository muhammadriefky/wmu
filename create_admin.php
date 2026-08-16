<?php
$user = new App\Models\User();
$user->nama = 'Administrator 2';
$user->email = 'admin2@winmulyautama.com';
$user->kata_sandi = Hash::make('password');
$user->save();
echo "Success\n";
