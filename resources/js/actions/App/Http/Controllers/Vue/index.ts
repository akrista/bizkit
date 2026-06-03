import DashboardController from './DashboardController'
import ProfileController from './ProfileController'
import SecurityController from './SecurityController'
import TeamController from './TeamController'
const Vue = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ProfileController: Object.assign(ProfileController, ProfileController),
SecurityController: Object.assign(SecurityController, SecurityController),
TeamController: Object.assign(TeamController, TeamController),
}

export default Vue