import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
import members from './members'
import invitations from './invitations'
/**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/svelte/settings/teams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Svelte\TeamController::index
 * @see app/Http/Controllers/Svelte/TeamController.php:27
 * @route '/svelte/settings/teams'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Svelte\TeamController::store
 * @see app/Http/Controllers/Svelte/TeamController.php:47
 * @route '/svelte/settings/teams'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/svelte/settings/teams',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::store
 * @see app/Http/Controllers/Svelte/TeamController.php:47
 * @route '/svelte/settings/teams'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::store
 * @see app/Http/Controllers/Svelte/TeamController.php:47
 * @route '/svelte/settings/teams'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::store
 * @see app/Http/Controllers/Svelte/TeamController.php:47
 * @route '/svelte/settings/teams'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Svelte\TeamController::store
 * @see app/Http/Controllers/Svelte/TeamController.php:47
 * @route '/svelte/settings/teams'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
export const edit = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/svelte/settings/teams/{team?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
edit.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
edit.get = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
edit.head = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
    const editForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
        editForm.get = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Svelte\TeamController::edit
 * @see app/Http/Controllers/Svelte/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
        editForm.head = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
export const update = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/svelte/settings/teams/{team?}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
update.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
update.put = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::update
 * @see app/Http/Controllers/Svelte/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
    const updateForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Svelte/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
        updateForm.put = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Svelte/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
export const destroy = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/svelte/settings/teams/{team?}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
destroy.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
destroy.delete = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Svelte\TeamController::destroy
 * @see app/Http/Controllers/Svelte/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
    const destroyForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Svelte/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/svelte/settings/teams/{team?}'
 */
        destroyForm.delete = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const teams = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
members: Object.assign(members, members),
invitations: Object.assign(invitations, invitations),
}

export default teams