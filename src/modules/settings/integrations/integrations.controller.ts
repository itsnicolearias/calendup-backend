import { Request, Response, NextFunction } from 'express'
import integrationsService from './integrations.service'
import { config } from '../../../config/environments'


export const getIntegrations = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size } = req.query;
    const professionalId = req.myUser?.userId ;

    const data = await integrationsService.getAll(professionalId, [], Number(page), Number(size));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.myUser?.userId;
    const data = await integrationsService.getOne({ integrationId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


export const updateIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await integrationsService.update(req.body, { integrationId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await integrationsService.delete({ integrationId: req.params.id }, professionalId, false);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


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

export const startZoomAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = await integrationsService.getZoomAuthUrl()
    console.log(url)
    res.redirect(url)
  } catch (error) {
    next(error)
  }
}

export const handleZoomCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code as string
    const userId = req?.myUser?.userId
    await integrationsService.handleZoomCallback(code, userId)
    res.redirect(`${config.urlFront}/settings/integrations?success=google`)
  } catch (error) {
    next(error)
  }
}
