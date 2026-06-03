import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Vue\SecurityController::update
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vue/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Vue\SecurityController::update
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\SecurityController::update
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Vue\SecurityController::update
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
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
* @see \App\Http\Controllers\Vue\SecurityController::update
 * @see app/Http/Controllers/Vue/SecurityController.php:82
 * @route '/vue/settings/password'
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
const password = {
    update: Object.assign(update, update),
}

export default password