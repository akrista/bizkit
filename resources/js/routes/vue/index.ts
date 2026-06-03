import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import verification from './verification'
import security from './security'
import password from './password'
import twoFactor from './two-factor'
import teams from './teams'
import invitations from './invitations'
/**
 * @see routes/vue.php:15
 * @route '/vue'
 */
export const welcome = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcome.url(options),
    method: 'get',
})

welcome.definition = {
    methods: ["get","head"],
    url: '/vue',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/vue.php:15
 * @route '/vue'
 */
welcome.url = (options?: RouteQueryOptions) => {
    return welcome.definition.url + queryParams(options)
}

/**
 * @see routes/vue.php:15
 * @route '/vue'
 */
welcome.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: welcome.url(options),
    method: 'get',
})
/**
 * @see routes/vue.php:15
 * @route '/vue'
 */
welcome.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: welcome.url(options),
    method: 'head',
})

    /**
 * @see routes/vue.php:15
 * @route '/vue'
 */
    const welcomeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: welcome.url(options),
        method: 'get',
    })

            /**
 * @see routes/vue.php:15
 * @route '/vue'
 */
        welcomeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: welcome.url(options),
            method: 'get',
        })
            /**
 * @see routes/vue.php:15
 * @route '/vue'
 */
        welcomeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: welcome.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    welcome.form = welcomeForm
/**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/vue/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Vue\DashboardController::__invoke
 * @see app/Http/Controllers/Vue/DashboardController.php:13
 * @route '/vue/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const vue = {
    welcome: Object.assign(welcome, welcome),
dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
verification: Object.assign(verification, verification),
security: Object.assign(security, security),
password: Object.assign(password, password),
twoFactor: Object.assign(twoFactor, twoFactor),
teams: Object.assign(teams, teams),
invitations: Object.assign(invitations, invitations),
}

export default vue