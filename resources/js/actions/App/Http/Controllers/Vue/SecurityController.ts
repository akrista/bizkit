import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/vue/settings/security',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Vue\SecurityController::edit
 * @see app/Http/Controllers/Vue/SecurityController.php:23
 * @route '/vue/settings/security'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Vue\SecurityController::updatePassword
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/vue/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Vue\SecurityController::updatePassword
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\SecurityController::updatePassword
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Vue\SecurityController::updatePassword
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
    const updatePasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePassword.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Vue\SecurityController::updatePassword
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
        updatePasswordForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePassword.form = updatePasswordForm
/**
* @see \App\Http\Controllers\Vue\SecurityController::disableTwoFactor
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
export const disableTwoFactor = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disableTwoFactor.url(options),
    method: 'post',
})

disableTwoFactor.definition = {
    methods: ["post"],
    url: '/vue/settings/two-factor/disable',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Vue\SecurityController::disableTwoFactor
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
disableTwoFactor.url = (options?: RouteQueryOptions) => {
    return disableTwoFactor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\SecurityController::disableTwoFactor
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
disableTwoFactor.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disableTwoFactor.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Vue\SecurityController::disableTwoFactor
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
    const disableTwoFactorForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disableTwoFactor.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Vue\SecurityController::disableTwoFactor
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
        disableTwoFactorForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disableTwoFactor.url(options),
            method: 'post',
        })
    
    disableTwoFactor.form = disableTwoFactorForm
const SecurityController = { edit, updatePassword, disableTwoFactor }

export default SecurityController