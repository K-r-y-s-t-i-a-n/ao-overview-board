<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use App\Models\Team;
use App\Models\Teambgcolor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TeamResource::collection(Team::all()->sortBy('name'));
    }

    public function indexColors()
    {
        return Teambgcolor::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('edit', 'users');

        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:64', 'unique:teams,name'],
            'color' => ['integer', 'distinct', Rule::exists('teambgcolors', 'id')]
        ]);

        $team = new Team();
        $team->name = request('name');
        $team->color_id = request('color');

        $team->save();

        return new TeamResource($team);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }
}
