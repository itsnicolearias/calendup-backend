import { Request, Response, NextFunction } from 'express'
import integrationsService from './integrations.service'
import { config } from '../../../config/environments'


export const startCalendarAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = await integrationsService.getCalendarAuthUrl()
    res.redirect(url)
  } catch (error) {
    next(error)
  }
}

export const handleCalendarCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code as string
    const userId = req?.myUser?.userId
    await integrationsService.handleCalendarCallback(code, userId)
    res.redirect(`${config.urlFront}/settings/integrations?success=google`)
  } catch (error) {
    next(error)
  }
}
