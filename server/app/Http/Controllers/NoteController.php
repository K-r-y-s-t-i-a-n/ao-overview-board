<?php

namespace App\Http\Controllers;

use App\Models\Note;
use DateTimeImmutable;
use Illuminate\Http\Request;
use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResource;
use Symfony\Component\HttpFoundation\Response;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        //TODO Add pagination
        if ($request->tag_id && $request->team_id) {
            return Note::whereHas('tags', function ($q) use ($request) {
                $q->where('id', $request->tag_id);
            })
                ->where('team_id', $request->team_id)
                ->with('tags:id,name', 'team')->get();
        }

        if ($request->tag_id) {
            return Note::whereHas('tags', function ($q) use ($request) {
                $q->where('id', $request->tag_id);
            })->with('tags:id,name', 'team')->get();
        }

        if ($request->team_id) {
            return Note::where('team_id', $request->team_id)->with(['tags:id,name', 'team'])->get();
        }

        return NoteResource::collection(Note::all());
    }

    // function getSortedNotes($unsortedNotes)
    // {
    //     $formattedNotes = [];

    //     foreach ($unsortedNotes as $note) {
    //         $note['created_at'] = new DateTimeImmutable($note['created_at']);
    //         $note['updated_at'] = new DateTimeImmutable($note['updated_at']);

    //         $date = $note['updated_at']->format('d M Y - l');
    //         $formattedNotes[$date][] = $note;
    //     }

    //     ksort($formattedNotes);

    //     return $formattedNotes;
    // }


    // public function index(Request $request)
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

    //     $notes = NoteResource::collection(Note::all());

    //     return NoteController::getSortedNotes($notes);
    // }

    public function store(NoteRequest $request)
    {
        $this->authorize('create', 'notes');

        $note = Note::create([
            // "title" => $request->get("title"),
            'text' => $request->text,
            'added_by' => auth()->user()->display_name,
            'team_id' => auth()->user()->team->id ?? null,
            'is_edited' => false
        ]);

        $note->tags()->attach($request->input('tags'));

        return response(new NoteResource($note), Response::HTTP_CREATED);
    }
}
