import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/react/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\React\ProfileController::edit
 * @see app/Http/Controllers/React/ProfileController.php:20
 * @route '/react/settings/profile'
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
* @see \App\Http\Controllers\React\ProfileController::update
 * @see app/Http/Controllers/React/ProfileController.php:38
 * @route '/react/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/react/settings/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\React\ProfileController::update
 * @see app/Http/Controllers/React/ProfileController.php:38
 * @route '/react/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\React\ProfileController::update
 * @see app/Http/Controllers/React/ProfileController.php:38
 * @route '/react/settings/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\React\ProfileController::update
 * @see app/Http/Controllers/React/ProfileController.php:38
 * @route '/react/settings/profile'
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
* @see \App\Http\Controllers\React\ProfileController::update
 * @see app/Http/Controllers/React/ProfileController.php:38
 * @route '/react/settings/profile'
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
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default profile