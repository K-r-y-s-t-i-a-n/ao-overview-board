<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use App\Models\Team;
use App\Models\Teambgcolor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

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

    public function update(Request $request, Team $team)
    {
        $this->authorize('edit', 'users');

        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:64', Rule::unique('teams')->ignore($team)],
            'color' => ['integer', 'distinct', Rule::exists('teambgcolors', 'id')]
        ]);

        $validated['color_id'] = $validated['color'];

        $team->update($validated);

        return new TeamResource($team);
    }


    public function destroy(Team $team)
    {
        $id = $team->id;
        $team->delete();

        return response(["id" => $id], Response::HTTP_ACCEPTED);
    }
}
