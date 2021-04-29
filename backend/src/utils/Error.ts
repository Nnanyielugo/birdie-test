// import { IError } from './../interfaces/error';
import { IError } from '../interfaces';
export class CustomError extends Error implements IError {
  constructor(
    public message: string,
    public status: number,
    public name: string
  ) {
    super(message);
  }
}
