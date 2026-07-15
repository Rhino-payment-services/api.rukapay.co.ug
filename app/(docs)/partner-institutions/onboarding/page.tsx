import { ApiReferencePage } from '@/components/docs/ApiReferencePage'
import { onboardingEndpoints } from '@/lib/partner-institutions-api'

export const metadata = { title: 'Institution Onboarding' }

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'get-partner-institutions', title: 'List' },
  { id: 'post-partner-institutions', title: 'Create' },
  { id: 'patch-partner-institutions-institutionId-withdrawal-settings', title: 'Withdrawal settings' },
]

export default function PartnerInstitutionsOnboardingPage() {
  return (
    <ApiReferencePage
      badge="Partner - Institutions"
      title="Onboarding"
      description="Create a SACCO under your partner, then configure withdrawals."
      toc={toc}
      showSandboxNotice={false}
      overview={
        <>
          <h2>Overview</h2>
          <p>
            Start here. <code>code</code> and <code>name</code> are required. Optionally link a
            core-banking <code>externalOrgId</code>, create a settlement wallet, and invite the
            first staff user in the same call.
          </p>
          <ul>
            <li>Institution-scoped staff cannot create new SACCOs</li>
            <li>Duplicate <code>code</code> or <code>externalOrgId</code> returns 409</li>
          </ul>
        </>
      }
      endpoints={onboardingEndpoints}
    />
  )
}
