import { Request, Response } from 'express';

export type GitAuthRequest = Request;

export type GitAuthResponse = Response;

export interface CreateRepoRequest extends Request {
  name: string;
  description: string;
}

export type CreateRepoResponse = Response;
