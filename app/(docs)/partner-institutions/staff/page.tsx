import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { staffEndpoints, STAFF_ROLES } from '@/lib/partner-institutions-api'

export const metadata = { title: 'Institution Staff' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'roles', title: 'Roles' },
  { id: 'get-partner-institutions-institutionId-staff', title: 'List' },
  { id: 'post-partner-institutions-institutionId-staff', title: 'Create' },
  { id: 'patch-partner-institutions-institutionId-staff-memberId', title: 'Update' },
  { id: 'post-partner-institutions-institutionId-staff-memberId-resend-invitation', title: 'Resend invite' },
]

export default function PartnerInstitutionsStaffPage() {
  return (
    <ApiReferencePage
      badge="Partner - Institutions"
      title="Staff"
      description="Invite SACCO staff with roles and permissions. They set their own password via email."
      toc={toc}
      showSandboxNotice={false}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Staff are dashboard logins for the institution — separate from members. Creating
            staff sends an invitation email (do not set passwords in the API).
          </p>
          <h3 id="roles">Roles</h3>
          <div className="not-prose my-4 flex flex-wrap gap-2">
            {STAFF_ROLES.map((role) => (
              <code
                key={role}
                className="rounded-md border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-content"
              >
                {role}
              </code>
            ))}
          </div>
          <p className="text-sm text-content-muted">
            Fine-tune with <code>canManageMembers</code>, <code>canManageInstitution</code>,{' '}
            <code>canViewTransactions</code>, and <code>canRequestLiquidation</code>.
          </p>
        </>
      }
      endpoints={staffEndpoints}
    />
  )
}
