export function isAdmin(role: string | undefined): boolean {
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
}