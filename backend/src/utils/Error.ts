// import { IError } from './../interfaces/error';
import { IError } from '../interfaces';
export class CustomError extends Error implements IError {
  constructor(
    public name: string,
    public status: number,
    public message: string
  ) {
    super(message);
  }
}
