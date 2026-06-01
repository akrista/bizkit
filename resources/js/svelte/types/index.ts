export type User = {
    id: number;
    name: string;
    email: string;
    initials: string;
    email_verified_at: string | null;
    two_factor_enabled: boolean;
    current_team_id: number | null;
};

export type Team = {
    id: number;
    name: string;
    slug: string;
    isPersonal: boolean;
    role?: string;
    roleLabel?: string;
    isCurrent?: boolean;
};

export type TeamMember = {
    id: number;
    name: string;
    email: string;
    role: string;
    roleLabel: string;
};

export type TeamInvitation = {
    code: string;
    email: string;
    role: string;
    roleLabel: string;
    createdAt: string;
};

export type TeamPermissions = {
    canUpdateTeam: boolean;
    canDeleteTeam: boolean;
    canAddMember: boolean;
    canUpdateMember: boolean;
    canRemoveMember: boolean;
    canCreateInvitation: boolean;
    canCancelInvitation: boolean;
};

export type Membership = {
    role: string | null;
    roleLabel: string | null;
    permissions: TeamPermissions;
};

export type BreadcrumbItem = {
    title: string;
    href?: string;
};

export type NavItem = {
    title: string;
    href: string;
};

export type PageProps = {
    auth: { user: User | null };
    sidebarOpen: boolean;
    flash: {
        success: string | null;
        error: string | null;
    };
    current_team: Team | null;
    teams: Team[];
    membership: Membership | null;
};
