<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class UpdateLastVisitedAndVisitCount
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // if (Auth::check()) {
        //     $user = Auth::user();
        //     $user->last_visited_at = now();
        //     $user->visit_count = $user->visit_count + 1;
        //     $user->save();
        // }

        if (Auth::check()) {
            $user = Auth::user();
            $user->timestamps = false;

            $lastVisitedTime = $user->last_visited_at;

            $currentTime = now();

            $timeDifferenceInMinutes = $currentTime->diffInMinutes($lastVisitedTime);

            if ($timeDifferenceInMinutes >= 1) {
                $user->visit_count = $user->visit_count + 1;
            }

            $user->last_visited_at = $currentTime;
            $user->save();
            $user->timestamps = true;
        }

        return $next($request);
    }
}
