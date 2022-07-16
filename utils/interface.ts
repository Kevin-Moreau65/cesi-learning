import { NextFunction, Request, Response } from 'express';

export type Middleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => NextFunction | Response;
export type Controller = (
	req: Request,
	res: Response
) => Response | Promise<Response>;
export enum Roles {
	Student = '0',
	Teacher = '1',
	Admin = '2'
}
