import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { In } from 'typeorm';
import BF3DataSource from '../db/bf3-data-source';
import { DevicePreferences } from '../db/entities/DevicePreferences';
import { Highlight } from '../db/entities/Highlight';

const preferencesRouter = express.Router();

type DisplayPreferencesRequest = Request<
  unknown,
  unknown,
  {
    username: string,
    deviceId: string,
    displayPreferences: any
  },
  never
>;

preferencesRouter.post('/display/upsert', asyncHandler(async (req: DisplayPreferencesRequest, res: Response) => {
  const PreferencesRepository = BF3DataSource.getRepository(DevicePreferences);

  const existingDevicePreferences = await PreferencesRepository.find({
    where: {
      username: req.body.username,
      deviceId: req.body.deviceId
    },
    order: {
      updatedAt: 'DESC'
    },
    take: 1
  });

  if(existingDevicePreferences.length) {
    await PreferencesRepository.save(
      {
        id: existingDevicePreferences[0].id,
        username: existingDevicePreferences[0].username,
        deviceId: existingDevicePreferences[0].deviceId,
        displayPreferences: req.body.displayPreferences
      }
    )
  } else {
    await PreferencesRepository.insert({
      username: req.body.username,
      deviceId: req.body.deviceId,
      displayPreferences: req.body.displayPreferences
    })
  }

  res.send({success: true});
  return;
}));

preferencesRouter.post('/display/get', asyncHandler(async (req: DisplayPreferencesRequest, res: Response) => {
  const PreferencesRepository = BF3DataSource.getRepository(DevicePreferences);

  const existingDevicePreferences = await PreferencesRepository.find({
    where: {
      username: req.body.username,
      deviceId: req.body.deviceId
    },
    order: {
      updatedAt: 'DESC'
    },
    take: 1
  });

  if(existingDevicePreferences.length) {
    res.send({
      success: true,
      deviceId: existingDevicePreferences[0].deviceId,
      preferences: existingDevicePreferences[0].displayPreferences
    })
    return;
  } else {
    const bestUserPreferences = await PreferencesRepository.find({
      where: {
        username: req.body.username,
      },
      order: {
        updatedAt: 'DESC'
      },
      take: 1
    })

    if(bestUserPreferences.length) {
      await PreferencesRepository.insert({
        username: req.body.username,
        deviceId: req.body.deviceId,
        displayPreferences: bestUserPreferences[0].displayPreferences
      })

      res.send({
        success: true,
        deviceId: req.body.deviceId,
        preferences: bestUserPreferences[0].displayPreferences
      })
      return;
    } else {
      await PreferencesRepository.insert({
        username: req.body.username,
        deviceId: req.body.deviceId,
        displayPreferences: req.body.displayPreferences
      })
    }
  }

  res.send({
    success: true,
    deviceId: req.body.deviceId,
    preferences: req.body.displayPreferences
  });
  return;
}));



export default preferencesRouter;
