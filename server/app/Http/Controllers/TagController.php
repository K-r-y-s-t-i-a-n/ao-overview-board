<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\TagResource;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return TagResource::collection(Tag::all());
    }

    public function indexCategories()
    {
        return CategoryResource::collection(Category::all()->sortBy('id'));
    }

    public function indexCategoriesOnly()
    {
        // return Category::all();
        return Category::orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:2',
            'category' => 'required|exists:categories,id'
        ]);

        $tag = new Tag();
        $tag->name = $request->input('name');
        $tag->category_id = $request->input('category');
        $tag->created_by = auth()->user()->display_name;

        $tag->save();

        return response()->json(
            $tag,
            JsonResponse::HTTP_CREATED
        );
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|min:2',
            'category' => 'required|exists:categories,id'
        ]);

        $tag = Tag::find($id);

        if (!$tag) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tag not found.',
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        $tag->name = $request->input('name');
        $tag->category_id = $request->input('category');

        $tag->save();

        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Tag updated successfully.',
        //     'tag' => $tag
        // ], JsonResponse::HTTP_OK);

        return response()->json(
            $tag,
            JsonResponse::HTTP_OK
        );
    }

    // ! SPRAWDZIC I DOSTOSOWAC
    public function destroy($id)
    {
        $tag = Tag::find($id);

        if (!$tag) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tag not found.',
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        $tag->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Tag deleted successfully.',
        ], JsonResponse::HTTP_OK);
    }
}
