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

    public function index(Request $request)
    {
        if ($request->has('trashed')) {
            $this->authorize('view', 'actionsDeleted');
            $actions = Action::onlyTrashed()
                ->get();
        } else {
            $this->authorize('view', 'actions');
            $actions = Action::orderBy('updated_at', 'desc')
                ->get();
        }

        return ActionResource::collection($actions);
    }

    public function store(ActionRequest $request)
    {
        $this->authorize('create', 'actions');

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
        $this->authorize('edit', 'actions');

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
        $this->authorize('edit', 'actionsStatus');

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


    public function forceDelete($id)
    {
        $this->authorize('delete', 'actionsPerm');

        $action = Action::withTrashed()->find($id);
        if (!$action) {
            return response('', Response::HTTP_BAD_REQUEST);
        }
        $action->forceDelete();

        return response(["id" => $id], Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->authorize('delete', 'actions');

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
        $this->authorize('edit', 'actionsPerm');

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
