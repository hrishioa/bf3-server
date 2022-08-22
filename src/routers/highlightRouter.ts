import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import BF3DataSource from '../db/bf3-data-source';
import { Highlight } from '../db/entities/Highlight';

const highlightRouter = express.Router();

type UpsertHighlightRequest = Request<
  unknown,
  unknown,
  {
    creator: string;
    workId: number;
    chapterId: number;
    startTag: number;
    endTag: number;
    note: string;
    opType: 'upsert' | 'delete';
  },
  never
>;

highlightRouter.post(
  '/upsert',
  asyncHandler(async (req: UpsertHighlightRequest, res: Response) => {
    const HighlightRepository = BF3DataSource.getRepository(Highlight);

    const existingHighlight = await HighlightRepository.find({
      select: ['id'],
      where: {
        creator: req.body.creator,
        workId: req.body.workId,
        chapterId: req.body.chapterId,
        startTag: req.body.startTag,
        endTag: req.body.endTag
      }
    });

    const highlightRecord = {
      creator: req.body.creator,
      workId: req.body.workId,
      chapterId: req.body.chapterId,
      startTag: req.body.startTag,
      endTag: req.body.endTag,
      note: req.body.note
    };

    console.log('Highlight record is ',highlightRecord,', and type is ',req.body.opType);

    if(existingHighlight.length) {
      if(req.body.opType === 'delete') {
        console.log('Deleting existing highlight ',existingHighlight);
      } else {
        console.log('Updating');
      }
    } else {
      console.log('Inserting');
    }

    res.send({
      success: true
    });
  }),
);

export default highlightRouter;
