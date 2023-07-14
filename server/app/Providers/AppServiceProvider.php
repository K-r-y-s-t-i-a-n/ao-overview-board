<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Gate::define('view', function (User $user, $model) {
            return $user->hasAccess("view_{$model}")
                || $user->hasAccess("create_{$model}")
                || $user->hasAccess("edit_{$model}")
                || $user->hasAccess("delete_{$model}");
        });

        // Gate::define('create', function (User $user, $model) {
        //     return $user->hasAccess("create_{$model}");
        // });

        Gate::define('create', fn (User $user, $model) => $user->hasAccess("create{$model}"));

        Gate::define('edit', fn (User $user, $model) => $user->hasAccess("edit_{$model}"));

        Gate::define('delete', fn (User $user, $model) => $user->hasAccess("delete_{$model}"));
    }
}
