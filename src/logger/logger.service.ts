import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error.apply(this);
    console.log(message);
    this.doSomething(message);
  }
  private doSomething(message: any) {
    //do something
  }
}
