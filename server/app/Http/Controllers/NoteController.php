<?php

namespace App\Http\Controllers;

use App\Models\Note;
use DateTimeImmutable;
use Illuminate\Http\Request;
use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteCollection;
use App\Http\Resources\NoteResource;
use Symfony\Component\HttpFoundation\Response;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('view', 'notes');

        if ($request->tag_id && $request->team_id) {
            $notes = Note::whereHas('tags', function ($q) use ($request) {
                $q->where('id', $request->tag_id);
            })
                ->where('team_id', $request->team_id)
                ->with('tags:id,name', 'team')->orderBy('updated_at', 'desc')->paginate();
            return new NoteCollection($notes);
        }

        if ($request->tag_id) {
            $notes = Note::whereHas('tags', function ($q) use ($request) {
                $q->where('id', $request->tag_id);
            })
                ->with('tags:id,name', 'team')
                ->orderBy('updated_at', 'desc')
                ->paginate();
            return new NoteCollection($notes);
        }

        if ($request->team_id) {
            $notes = Note::where('team_id', $request->team_id)
                ->with(['tags:id,name', 'team'])
                ->orderBy('updated_at', 'desc')
                ->paginate();
            return new NoteCollection($notes);
        }

        return new NoteCollection(Note::orderBy('updated_at', 'desc')->paginate());
    }

    // public function index_old(Request $request)
    // {
    //     //TODO Add pagination
    //     if ($request->tag_id && $request->team_id) {
    //         return Note::whereHas('tags', function ($q) use ($request) {
    //             $q->where('id', $request->tag_id);
    //         })
    //             ->where('team_id', $request->team_id)
    //             ->with('tags:id,name', 'team')->get();
    //     }

    //     if ($request->tag_id) {
    //         return Note::whereHas('tags', function ($q) use ($request) {
    //             $q->where('id', $request->tag_id);
    //         })->with('tags:id,name', 'team')->get();
    //     }

    //     if ($request->team_id) {
    //         return Note::where('team_id', $request->team_id)->with(['tags:id,name', 'team'])->get();
    //     }

    //     return NoteResource::collection(Note::all());
    // }

    public function store(NoteRequest $request)
    {
        $this->authorize('create', 'notes');

        $note = Note::create([
            'text' => $request->text,
            'added_by' => auth()->user()->display_name,
            'team_id' => auth()->user()->team->id ?? null,
            'is_edited' => false
        ]);

        $note->tags()->attach($request->input('tags'));

        return response(new NoteResource($note), Response::HTTP_CREATED);
    }
}
