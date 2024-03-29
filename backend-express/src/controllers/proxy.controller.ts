import type { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { createSuccess } from '../helpers/http.helper';
import { callRasa, replaceNamePlaceholder, processText } from '../services/proxy.service';

export const converseRasa = async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, email, text } = req.body as { id: string; name: string; email: string; text: string };
  if (!id || !name || !email || !text) return next(createError(400, 'Please, enter all fields'));

  const cannotRespondMsg = `Sorry ${(name?.split(' ')?.[0] ?? '').trim()}, I can't provide a response at the moment.`;

  try {
    const rasaRes = await callRasa({ sender: email, text });
    console.log('rasaRes => ', rasaRes);
    const textToReplace = rasaRes?.text;
    if (!textToReplace)
      return createSuccess(res, 200, 'Dentbud responded successfully', {
        text: textToReplace.trim() || cannotRespondMsg,
      });
    const textToProcess = await replaceNamePlaceholder(textToReplace, name);
    const textToSend = await processText(textToProcess, text, { id, name, email });
    return createSuccess(res, 200, 'Dentbud responded successfully', {
      text: textToSend.trim() || cannotRespondMsg,
    });
  } catch (err) {
    return next(err);
  }
};
