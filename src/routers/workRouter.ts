import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import BF3DataSource from '../db/bf3-data-source';
import { UserWork } from '../db/entities/UserWork';

const userWorkRouter = express.Router();

type ScrollPosition = {
  chapterId: number;
  scrollPosition: number;
};

type GetWorkInfoRequest = Request<
  unknown,
  unknown,
  {
    username: string;
    workId: number;
  },
  never
>;

type SetPausePositionRequest = Request<
  unknown,
  unknown,
  {
    username: string;
    workId: number;
    pausePosition: ScrollPosition
  },
  never
>;

userWorkRouter.post('/setPausePosition', asyncHandler(async (req: SetPausePositionRequest, res: Response) => {
  const UserWorkRepository = BF3DataSource.getRepository(UserWork);

  const workInfos = await UserWorkRepository.find({
    where: {
      username: req.body.username,
      workId: req.body.workId,
    },
    order: {
      updatedAt: 'DESC',
    },
    take: 1,
  });

  if(workInfos.length) {
    await UserWorkRepository.save({
      id: workInfos[0].id,
      lastPausedPosition: req.body.pausePosition
    });
  } else {
    await UserWorkRepository.insert({
      username: req.body.username,
      workId: req.body.workId,
      lastPausedPosition: req.body.pausePosition,
      finished: false,
      lastVisited: new Date(),
    });
  }

  res.send({success: true});
}));

userWorkRouter.post(
  '/getInfo',
  asyncHandler(async (req: GetWorkInfoRequest, res: Response) => {
    const UserWorkRepository = BF3DataSource.getRepository(UserWork);

    const workInfos = await UserWorkRepository.find({
      where: {
        username: req.body.username,
        workId: req.body.workId,
      },
      order: {
        updatedAt: 'DESC',
      },
      take: 1,
    });

    if (workInfos.length) {
      await UserWorkRepository.save({
        id: workInfos[0].id,
        lastVisited: new Date(),
      });
    } else {
      await UserWorkRepository.insert({
        username: req.body.username,
        workId: req.body.workId,
        lastPausedPosition: null,
        finished: false,
        lastVisited: new Date(),
      });
    }

    res.send({
      success: true,
      userWork: {
        lastPausedPosition:
        (workInfos.length && workInfos[0].lastPausedPosition) || null,
        finished: (workInfos.length && workInfos[0].finished) || false,
      }
    });
  }),
);

export default userWorkRouter;
