<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        return view('app');
    }

    public function register()
    {
        return view('app');
    }
    public function login()
    {
        return view('app');
    }
    public function logout()
    {
        return view('app');
    }

}
