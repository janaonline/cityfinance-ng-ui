import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getQuestion'
})
export class GetQuestionPipe implements PipeTransform {

  transform(question: any, outerQuestions: any): unknown {
    // const outerQuestion = outerQuestions.find(outerQuestion => outerQuestion?.shortKey == question?.shortKey);
    return {
      // ...outerQuestion,
      ...question,
    };
  }

}
