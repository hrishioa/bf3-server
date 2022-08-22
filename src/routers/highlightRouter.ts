import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { In } from 'typeorm';
import BF3DataSource from '../db/bf3-data-source';
import { Highlight } from '../db/entities/Highlight';

const highlightRouter = express.Router();

type UpsertHighlightRequest = Request<
  unknown,
  unknown,
  {
    creator: string;
    highlightId: number;
    workId: number;
    chapterId: number;
    startTag: number;
    endTag: number;
    note: string;
    opType: 'upsert' | 'delete';
  },
  never
>;

type GetHighlightRequest = Request<
  unknown,
  unknown,
  {
    creators?: string[];
    workId: number;
  },
  never
>;

highlightRouter.post(
  '/getAllForWork',
  asyncHandler(async (req: GetHighlightRequest, res: Response) => {
    const highlightQuery: any = {
      where: {
        workId: req.body.workId,
      },
    };

    if (req.body.creators && req.body.creators.length)
      highlightQuery.where.creator = In(req.body.creators);

    const HighlightRepository = BF3DataSource.getRepository(Highlight);

    const existingHighlights = await HighlightRepository.find(highlightQuery);
    existingHighlights.forEach(highlight => {
      highlight.id = highlight.highlightId;
    })

    res.send({
      success: true,
      highlights: existingHighlights
    });
  }),
);

highlightRouter.post(
  '/upsert',
  asyncHandler(async (req: UpsertHighlightRequest, res: Response) => {
    const HighlightRepository = BF3DataSource.getRepository(Highlight);

    try {
      const existingHighlight = await HighlightRepository.find({
        select: ['id'],
        where: {
          creator: req.body.creator,
          workId: req.body.workId,
          chapterId: req.body.chapterId,
          startTag: req.body.startTag,
          endTag: req.body.endTag,
        },
      });

      const highlightRecord = {
        creator: req.body.creator,
        workId: req.body.workId,
        highlightId: req.body.highlightId,
        chapterId: req.body.chapterId,
        startTag: req.body.startTag,
        endTag: req.body.endTag,
        note: req.body.note,
      };

      if (existingHighlight.length) {
        if (req.body.opType === 'delete') {
          await HighlightRepository.remove(existingHighlight);
        } else {
          await HighlightRepository.save({
            ...highlightRecord,
            ...{
              id: existingHighlight[0].id,
            },
          });
        }
      } else {
        await HighlightRepository.insert(highlightRecord);
      }
    } catch(err) {
      console.error('Error upserting ids - ',req.body,err);
    }

    res.send({
      success: true,
    });
  }),
);

export default highlightRouter;
