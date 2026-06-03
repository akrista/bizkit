import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
export const update = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/svelte/settings/teams/{team?}/members/{userId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
update.url = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    team: args[0],
                    userId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "team",
        ])

    const parsedArgs = {
                        team: (typeof args.team === 'object'
                ? args.team.slug
                : args.team) ?? '$currentTeam',
                                userId: args.userId,
                }

    return update.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
update.put = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
    const updateForm = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
        updateForm.put = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
export const destroy = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/svelte/settings/teams/{team?}/members/{userId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
destroy.url = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    team: args[0],
                    userId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "team",
        ])

    const parsedArgs = {
                        team: (typeof args.team === 'object'
                ? args.team.slug
                : args.team) ?? '$currentTeam',
                                userId: args.userId,
                }

    return destroy.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
destroy.delete = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
    const destroyForm = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}/members/{userId}'
 */
        destroyForm.delete = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const members = {
    update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default members