import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/vue/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Vue\ProfileController::edit
 * @see app/Http/Controllers/Vue/ProfileController.php:20
 * @route '/vue/settings/profile'
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
* @see \App\Http\Controllers\Vue\ProfileController::update
 * @see app/Http/Controllers/Vue/ProfileController.php:38
 * @route '/vue/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vue/settings/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Vue\ProfileController::update
 * @see app/Http/Controllers/Vue/ProfileController.php:38
 * @route '/vue/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\ProfileController::update
 * @see app/Http/Controllers/Vue/ProfileController.php:38
 * @route '/vue/settings/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Vue\ProfileController::update
 * @see app/Http/Controllers/Vue/ProfileController.php:38
 * @route '/vue/settings/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Vue\ProfileController::update
 * @see app/Http/Controllers/Vue/ProfileController.php:38
 * @route '/vue/settings/profile'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Vue\ProfileController::sendVerification
 * @see app/Http/Controllers/Vue/ProfileController.php:56
 * @route '/vue/settings/email/verification-notification'
 */
export const sendVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendVerification.url(options),
    method: 'post',
})

sendVerification.definition = {
    methods: ["post"],
    url: '/vue/settings/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Vue\ProfileController::sendVerification
 * @see app/Http/Controllers/Vue/ProfileController.php:56
 * @route '/vue/settings/email/verification-notification'
 */
sendVerification.url = (options?: RouteQueryOptions) => {
    return sendVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\ProfileController::sendVerification
 * @see app/Http/Controllers/Vue/ProfileController.php:56
 * @route '/vue/settings/email/verification-notification'
 */
sendVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendVerification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Vue\ProfileController::sendVerification
 * @see app/Http/Controllers/Vue/ProfileController.php:56
 * @route '/vue/settings/email/verification-notification'
 */
    const sendVerificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendVerification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Vue\ProfileController::sendVerification
 * @see app/Http/Controllers/Vue/ProfileController.php:56
 * @route '/vue/settings/email/verification-notification'
 */
        sendVerificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendVerification.url(options),
            method: 'post',
        })
    
    sendVerification.form = sendVerificationForm
const ProfileController = { edit, update, sendVerification }

export default ProfileController