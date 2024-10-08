import { useParams } from 'react-router-dom'
import Layout from '@app/shared/layout'

export default function Campaign({ data }) {
  const params = useParams()
  const campaignId = +params.campaignId
  // TODO: Add the following code to the Campaign component
  return (
    <Layout>
      <h1>Campaign{campaignId}</h1>
    </Layout>
  )
}
