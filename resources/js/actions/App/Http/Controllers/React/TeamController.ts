import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/react/settings/teams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\React\TeamController::index
 * @see app/Http/Controllers/React/TeamController.php:27
 * @route '/react/settings/teams'
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
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:47
 * @route '/react/settings/teams'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/react/settings/teams',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:47
 * @route '/react/settings/teams'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:47
 * @route '/react/settings/teams'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:47
 * @route '/react/settings/teams'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::store
 * @see app/Http/Controllers/React/TeamController.php:47
 * @route '/react/settings/teams'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\React\TeamController::switchMethod
 * @see app/Http/Controllers/React/TeamController.php:260
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/switch'
 */
export const switchMethod = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(args, options),
    method: 'post',
})

switchMethod.definition = {
    methods: ["post"],
    url: '/react/settings/teams/{team?}/switch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\React\TeamController::switchMethod
 * @see app/Http/Controllers/React/TeamController.php:260
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/switch'
 */
switchMethod.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return switchMethod.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::switchMethod
 * @see app/Http/Controllers/React/TeamController.php:260
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/switch'
 */
switchMethod.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: switchMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\React\TeamController::switchMethod
 * @see app/Http/Controllers/React/TeamController.php:260
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/switch'
 */
    const switchMethodForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: switchMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::switchMethod
 * @see app/Http/Controllers/React/TeamController.php:260
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/switch'
 */
        switchMethodForm.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: switchMethod.url(args, options),
            method: 'post',
        })
    
    switchMethod.form = switchMethodForm
/**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
export const edit = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/react/settings/teams/{team?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
edit.get = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
edit.head = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
    const editForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
        editForm.get = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\React\TeamController::edit
 * @see app/Http/Controllers/React/TeamController.php:65
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::update
 * @see app/Http/Controllers/React/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
export const update = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/react/settings/teams/{team?}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\React\TeamController::update
 * @see app/Http/Controllers/React/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::update
 * @see app/Http/Controllers/React/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
update.put = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\React\TeamController::update
 * @see app/Http/Controllers/React/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::update
 * @see app/Http/Controllers/React/TeamController.php:122
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
export const destroy = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/react/settings/teams/{team?}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
 */
destroy.delete = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
* @see \App\Http\Controllers\React\TeamController::destroy
 * @see app/Http/Controllers/React/TeamController.php:141
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}'
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
/**
* @see \App\Http\Controllers\React\TeamController::updateMember
 * @see app/Http/Controllers/React/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
export const updateMember = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMember.url(args, options),
    method: 'put',
})

updateMember.definition = {
    methods: ["put"],
    url: '/react/settings/teams/{team?}/members/{userId}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\React\TeamController::updateMember
 * @see app/Http/Controllers/React/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
updateMember.url = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions) => {
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

    return updateMember.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::updateMember
 * @see app/Http/Controllers/React/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
updateMember.put = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMember.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\React\TeamController::updateMember
 * @see app/Http/Controllers/React/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
    const updateMemberForm = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateMember.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::updateMember
 * @see app/Http/Controllers/React/TeamController.php:165
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
        updateMemberForm.put = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateMember.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateMember.form = updateMemberForm
/**
* @see \App\Http\Controllers\React\TeamController::removeMember
 * @see app/Http/Controllers/React/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
export const removeMember = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

removeMember.definition = {
    methods: ["delete"],
    url: '/react/settings/teams/{team?}/members/{userId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\React\TeamController::removeMember
 * @see app/Http/Controllers/React/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
removeMember.url = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions) => {
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

    return removeMember.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::removeMember
 * @see app/Http/Controllers/React/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
removeMember.delete = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeMember.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\React\TeamController::removeMember
 * @see app/Http/Controllers/React/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
    const removeMemberForm = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeMember.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::removeMember
 * @see app/Http/Controllers/React/TeamController.php:184
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/members/{userId}'
 */
        removeMemberForm.delete = (args: { team?: string | { slug: string }, userId: string | number } | [team: string | { slug: string }, userId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeMember.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeMember.form = removeMemberForm
/**
* @see \App\Http\Controllers\React\TeamController::invite
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
export const invite = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invite.url(args, options),
    method: 'post',
})

invite.definition = {
    methods: ["post"],
    url: '/react/settings/teams/{team?}/invitations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\React\TeamController::invite
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
invite.url = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return invite.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::invite
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
invite.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: invite.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\React\TeamController::invite
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
    const inviteForm = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: invite.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::invite
 * @see app/Http/Controllers/React/TeamController.php:194
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations'
 */
        inviteForm.post = (args?: { team?: string | { slug: string } } | [team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: invite.url(args, options),
            method: 'post',
        })
    
    invite.form = inviteForm
/**
* @see \App\Http\Controllers\React\TeamController::cancelInvitation
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
export const cancelInvitation = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancelInvitation.url(args, options),
    method: 'delete',
})

cancelInvitation.definition = {
    methods: ["delete"],
    url: '/react/settings/teams/{team?}/invitations/{code}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\React\TeamController::cancelInvitation
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
cancelInvitation.url = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions) => {
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

    return cancelInvitation.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::cancelInvitation
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
cancelInvitation.delete = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancelInvitation.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\React\TeamController::cancelInvitation
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
    const cancelInvitationForm = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelInvitation.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::cancelInvitation
 * @see app/Http/Controllers/React/TeamController.php:221
 * @param team - Default: '$currentTeam'
 * @route '/react/settings/teams/{team?}/invitations/{code}'
 */
        cancelInvitationForm.delete = (args: { team?: string | { slug: string }, code: string | number } | [team: string | { slug: string }, code: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelInvitation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancelInvitation.form = cancelInvitationForm
/**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
export const acceptInvitation = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: acceptInvitation.url(args, options),
    method: 'get',
})

acceptInvitation.definition = {
    methods: ["get","head"],
    url: '/react/invitations/{invitation}/accept',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
acceptInvitation.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
            args = { invitation: args.code }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invitation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invitation: typeof args.invitation === 'object'
                ? args.invitation.code
                : args.invitation,
                }

    return acceptInvitation.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
acceptInvitation.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: acceptInvitation.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
acceptInvitation.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: acceptInvitation.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
    const acceptInvitationForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: acceptInvitation.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
        acceptInvitationForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: acceptInvitation.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\React\TeamController::acceptInvitation
 * @see app/Http/Controllers/React/TeamController.php:235
 * @route '/react/invitations/{invitation}/accept'
 */
        acceptInvitationForm.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: acceptInvitation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    acceptInvitation.form = acceptInvitationForm
const TeamController = { index, store, switchMethod, edit, update, destroy, updateMember, removeMember, invite, cancelInvitation, acceptInvitation, switch: switchMethod }

export default TeamController