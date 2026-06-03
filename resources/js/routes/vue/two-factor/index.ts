import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Vue\SecurityController::disable
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
export const disable = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disable.url(options),
    method: 'post',
})

disable.definition = {
    methods: ["post"],
    url: '/vue/settings/two-factor/disable',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Vue\SecurityController::disable
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
disable.url = (options?: RouteQueryOptions) => {
    return disable.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\SecurityController::disable
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
disable.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disable.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Vue\SecurityController::disable
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
    const disableForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disable.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Vue\SecurityController::disable
 * @see app/Http/Controllers/Vue/SecurityController.php:102
 * @route '/vue/settings/two-factor/disable'
 */
        disableForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disable.url(options),
            method: 'post',
        })
    
    disable.form = disableForm
const twoFactor = {
    disable: Object.assign(disable, disable),
}

export default twoFactor