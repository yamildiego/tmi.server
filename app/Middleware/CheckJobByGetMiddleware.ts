import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from '../Models/Job'

const CheckJobByGetMiddleware = async (
  { params, response }: HttpContextContract,
  next: () => void
) => {
  const jobId = params.id ? parseInt(params.id) : null

  if (!jobId) return response.status(401).send({ status: 'required_job_id' })

  const job = await Job.find(jobId)

  if (job == null) return response.status(401).send({ status: 'invalid_job_id' })

  await next()
}

export default CheckJobByGetMiddleware
