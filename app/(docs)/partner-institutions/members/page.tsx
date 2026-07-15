import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { memberEndpoints } from '@/lib/partner-institutions-api'

export const metadata = { title: 'Institution Members' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'get-partner-institutions-institutionId-users', title: 'List' },
  { id: 'post-partner-institutions-institutionId-users', title: 'Create' },
  { id: 'post-partner-institutions-institutionId-users-validate-phone', title: 'Validate phone' },
  { id: 'patch-partner-institutions-institutionId-users-memberId', title: 'Update' },
  { id: 'delete-partner-institutions-institutionId-users-memberId', title: 'Remove' },
  { id: 'post-partner-institutions-institutionId-users-upload', title: 'Bulk upload' },
  { id: 'get-partner-institutions-users-template', title: 'Template' },
]

export default function PartnerInstitutionsMembersPage() {
  return (
    <ApiReferencePage
      badge="Partner - Institutions"
      title="Members"
      description="Register SACCO members and link them to core-banking accounts."
      toc={toc}
      showSandboxNotice={false}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Members need a phone. Use <code>accountNo</code> / <code>clientId</code> to connect
            core banking. Legal first/last names are set at create and cannot be edited later —
            change <code>displayName</code> instead.
          </p>
          <ul>
            <li>Validate phone against MNO before create when you need name matching</li>
            <li>Delete is blocked if the member already has transactions</li>
            <li>Bulk upload: download the Excel template, fill rows, POST multipart <code>file</code></li>
          </ul>
        </>
      }
      endpoints={memberEndpoints}
    />
  )
}
