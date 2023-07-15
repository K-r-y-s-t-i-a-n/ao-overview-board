<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\ActionStep;
use Illuminate\Http\Request;
use App\Http\Requests\ActionRequest;
use App\Http\Resources\ActionResource;
use Symfony\Component\HttpFoundation\Response;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //! Add permissions

        if ($request->has('trashed')) {
            $actions = Action::onlyTrashed()
                ->get();
        } else {
            $actions = Action::orderBy('updated_at', 'desc')
                ->get();
        }


        return ActionResource::collection($actions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ActionRequest $request)
    {
        //! Add permissions
        // Moze dodac unique together asset and issue --> errro taka maszyna z tymm problemem juz istnieje
        $action = new Action();
        $action->tag_id = request('asset');
        $action->status = request('status');
        $action->issue = request('issue');
        $action->save();

        $step = new ActionStep();
        $step->text = request('step');
        $step->added_by = auth()->user()->display_name;
        $action->steps()->save($step);

        return new ActionResource($action);
    }

    public function storeStep(Request $request, $id)
    {
        //! Add permissions
        $request->validate([
            'step' => ['required', 'string', 'max:1000']
        ]);

        $action = Action::find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }

        $step = new ActionStep();
        $step->text = request('step');
        $step->added_by = auth()->user()->display_name;
        $action->steps()->save($step);

        return new ActionResource($action);
    }

    public function updateStatus(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:RWI,Stopped,Testing,Other',
        ]);
        // $action = Action::onlyTrashed()->first($id);
        $action = Action::find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }
        $action->update($data);

        return response(new ActionResource($action), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $action = Action::withTrashed()->find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }
        $action->forceDelete();

        return response(["id" => $id], Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $action = Action::find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }
        $action->delete();
        // Action::destroy($id);
        return response(["id" => $id], Response::HTTP_ACCEPTED);
    }

    public function restore($id)
    {
        $action = Action::withTrashed()->find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }
        Action::withTrashed()->find($id)->restore();

        return  response(["id" => $id], Response::HTTP_ACCEPTED);
    }

    // public function restoreAll()
    // {
    //     Action::onlyTrashed()->restore();
    //     return response(null, Response::HTTP_ACCEPTED);
    // }
}
