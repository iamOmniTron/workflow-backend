

const PRIORITIES = {
    STUDENT:0,
    COORDINATOR:3,
    PG_ADMIN:2,
    SUPER_ADMIN:1
}


 const ROLES = {
    STUDENT:"student",
    COORDINATOR:"coordinator",
    PG_ADMIN:"pg_admin"
}


const STATUSES = {
    PENDING:"pending",
    SUCCESSFUL:"successful",
    REJECTED:"rejected"
}
module.exports = {
    PRIORITIES,ROLES,STATUSES
}