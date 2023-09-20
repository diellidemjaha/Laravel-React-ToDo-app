<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index(Request $request)
    {
      
        $user = User::find($request->user_id);
        $todos = $user->todos;

        return response()->json([
            'status'=> 200,
            'todos'=>$todos,
        ]);
    }

    public function store(Request $request)
    {
       
        $todo = new Todo;
        $todo->title = $request->input('title');
        $todo->checkbox = $request->input('checkbox');
        $todo->user_id = $request->user_id; 
        $todo->save();

      
    
        return response()->json([
            'status'=> 200,
            'todo'=>$todo,
        ]);
    }

    public function edit($id)
    {

        $todo = Todo::find($id);

        return view('todos.edit', compact('todo'));
    }

    public function update(Request $request, $id)
    {
        
        $todo = Todo::find($id);
        $todo->title = $request->title;
        $todo->save();

        return redirect()->route('todos.index', ['user_id' => $todo->user_id]);
    }

    public function markAsDone($id)
    {
     
        $todo = Todo::find($id);
        $todo->checkbox = true; 
        $todo->save();

        
        return response()->json([
            'status'=> 'success',
            'message'=>'ToDo marked as done',
        ]);
    }

    public function destroy($id)
    {
      
        $todo = Todo::find($id);
        $user_id = $todo->user_id;
        $todo->delete();

        return response()->json([
            'status'=> 'success',
            'message'=>'Todo deleted',
        ]);

     
    }
}
