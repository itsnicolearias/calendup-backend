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
    const data = await integrationsService.delete({ integrationId: req.params.id }, professionalId, true);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


export const startCalendarAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.myUser?.userId
    const url = await integrationsService.getCalendarAuthUrl(userId)
    res.json(url)
  } catch (error) {
    next(error)
  }
}

export const handleCalendarCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, state } = req.query as { code: string; state: string };

    await integrationsService.handleCalendarCallback(code, state)
    res.redirect(`${config.urlFront}/settings/integrations?success=google`)
  } catch (error) {
    next(error)
  }
}

export const startZoomAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const userId = req?.myUser?.userId

    const url = await integrationsService.getZoomAuthUrl(userId)
    res.json(url)
  } catch (error) {
    next(error)
  }
}

export const handleZoomCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, state } = req.query as { code: string; state: string };
    await integrationsService.handleZoomCallback(code, state)
    res.redirect(`${config.urlFront}/settings/integrations?success=zoom`)
  } catch (error) {
    next(error)
  }
}
