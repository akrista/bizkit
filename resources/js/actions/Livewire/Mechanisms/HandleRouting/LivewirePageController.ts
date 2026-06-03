import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
const LivewirePageControllere1a491b96eb517a86e591d309d0475fc = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, options),
    method: 'get',
})

LivewirePageControllere1a491b96eb517a86e591d309d0475fc.definition = {
    methods: ["get","head"],
    url: '/invitations/{invitation}/accept',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    invitation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invitation: args.invitation,
                }

    return LivewirePageControllere1a491b96eb517a86e591d309d0475fc.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
LivewirePageControllere1a491b96eb517a86e591d309d0475fc.get = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
LivewirePageControllere1a491b96eb517a86e591d309d0475fc.head = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
    const LivewirePageControllere1a491b96eb517a86e591d309d0475fcForm = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
        LivewirePageControllere1a491b96eb517a86e591d309d0475fcForm.get = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/invitations/{invitation}/accept'
 */
        LivewirePageControllere1a491b96eb517a86e591d309d0475fcForm.head = (args: { invitation: string | number } | [invitation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllere1a491b96eb517a86e591d309d0475fc.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageControllere1a491b96eb517a86e591d309d0475fc.form = LivewirePageControllere1a491b96eb517a86e591d309d0475fcForm
    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
const LivewirePageControllerfc6874003af373efc88e5e18eecd9c17 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})

LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.definition = {
    methods: ["get","head"],
    url: '/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url = (options?: RouteQueryOptions) => {
    return LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
    const LivewirePageControllerfc6874003af373efc88e5e18eecd9c17Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url(options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
        LivewirePageControllerfc6874003af373efc88e5e18eecd9c17Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url(options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/profile'
 */
        LivewirePageControllerfc6874003af373efc88e5e18eecd9c17Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageControllerfc6874003af373efc88e5e18eecd9c17.form = LivewirePageControllerfc6874003af373efc88e5e18eecd9c17Form
    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
const LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})

LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.definition = {
    methods: ["get","head"],
    url: '/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url = (options?: RouteQueryOptions) => {
    return LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
    const LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
        LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url(options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/appearance'
 */
        LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5.form = LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5Form
    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
const LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url(options),
    method: 'get',
})

LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.definition = {
    methods: ["get","head"],
    url: '/settings/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url = (options?: RouteQueryOptions) => {
    return LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url(options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url(options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
    const LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url(options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
        LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url(options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/security'
 */
        LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0.form = LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0Form
    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
const LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url(options),
    method: 'get',
})

LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.definition = {
    methods: ["get","head"],
    url: '/settings/teams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url = (options?: RouteQueryOptions) => {
    return LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.definition.url + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url(options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url(options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
    const LivewirePageController73bc24a6960b67f9ca4ae6979b030f8fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url(options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
        LivewirePageController73bc24a6960b67f9ca4ae6979b030f8fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url(options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @route '/settings/teams'
 */
        LivewirePageController73bc24a6960b67f9ca4ae6979b030f8fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f.form = LivewirePageController73bc24a6960b67f9ca4ae6979b030f8fForm
    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
const LivewirePageController106bf5700725795bc5365f9a811db640 = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, options),
    method: 'get',
})

LivewirePageController106bf5700725795bc5365f9a811db640.definition = {
    methods: ["get","head"],
    url: '/settings/teams/{team?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
LivewirePageController106bf5700725795bc5365f9a811db640.url = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team: args }
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
                        team: args?.team ?? '$currentTeam',
                }

    return LivewirePageController106bf5700725795bc5365f9a811db640.definition.url
            .replace('{team?}', parsedArgs.team?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
LivewirePageController106bf5700725795bc5365f9a811db640.get = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, options),
    method: 'get',
})
/**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
LivewirePageController106bf5700725795bc5365f9a811db640.head = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, options),
    method: 'head',
})

    /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
    const LivewirePageController106bf5700725795bc5365f9a811db640Form = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, options),
        method: 'get',
    })

            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
        LivewirePageController106bf5700725795bc5365f9a811db640Form.get = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, options),
            method: 'get',
        })
            /**
* @see \Livewire\Mechanisms\HandleRouting\LivewirePageController::__invoke
 * @see vendor/livewire/livewire/src/Mechanisms/HandleRouting/LivewirePageController.php:7
 * @param team - Default: '$currentTeam'
 * @route '/settings/teams/{team?}'
 */
        LivewirePageController106bf5700725795bc5365f9a811db640Form.head = (args?: { team?: string | number } | [team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LivewirePageController106bf5700725795bc5365f9a811db640.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LivewirePageController106bf5700725795bc5365f9a811db640.form = LivewirePageController106bf5700725795bc5365f9a811db640Form

/**
* Multiple routes resolve to \Livewire\Mechanisms\HandleRouting\LivewirePageController::LivewirePageController, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `LivewirePageController['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
const LivewirePageController = {
    '/invitations/{invitation}/accept': LivewirePageControllere1a491b96eb517a86e591d309d0475fc,
    '/settings/profile': LivewirePageControllerfc6874003af373efc88e5e18eecd9c17,
    '/settings/appearance': LivewirePageControllere19ee86e9cf603ce1a59a1ec5d21dec5,
    '/settings/security': LivewirePageControllerff0bf73dc6d707afdea1fe4ef5ac93c0,
    '/settings/teams': LivewirePageController73bc24a6960b67f9ca4ae6979b030f8f,
    '/settings/teams/{team?}': LivewirePageController106bf5700725795bc5365f9a811db640,
}

export default LivewirePageController