import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
export const store = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/react/settings/teams/{team?}/invitations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
store.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "team",
        ])

    const parsedArgs = {
                        team: (typeof args?.team === 'object'
                ? args.team.slug
                : args?.team) ?? '$currentTeam',
                }

    return store.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
store.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
    const storeForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
        storeForm.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
export const destroy = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/react/settings/teams/{team?}/invitations/{code}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
destroy.url = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    team: args[0],
                    code: args[1],
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
                                code: args.code,
                }

    return destroy.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
destroy.delete = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
    const destroyForm = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
        destroyForm.delete = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const invitations = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default invitations